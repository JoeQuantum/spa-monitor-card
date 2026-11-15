import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveConfig } from '../src/config.js';
import { readSensor, sampleTimestamp } from '../src/readings.js';

const sensor = options => resolveConfig({ sensors: { ph: { entity: 'sensor.ph', ...options } } }).sensors.ph;
const now = Date.parse('2026-11-14T12:00:00Z');

test('explicit attribute sources preserve zero and never fall back to state', () => {
  const s = sensor({ attribute: 'reading' });
  for (const value of [undefined, null, '', '7.5oops', true, Infinity]) {
    assert.equal(readSensor(s, { 'sensor.ph': { state: '7.5', attributes: { reading: value } } }).value, null);
  }
  assert.equal(readSensor(s, { 'sensor.ph': { state: '9', attributes: { reading: 0 } } }).value, 0);
  assert.equal(readSensor(s, { 'sensor.ph': { state: 'unavailable', attributes: { reading: 7.5 } } }).value, null);
  const climate = sensor({ entity: 'climate.spa', attribute: 'current_temperature' });
  assert.equal(readSensor(climate, { 'climate.spa': { state: 'heat', attributes: { current_temperature: 37 } } }).value, 37);
});

test('availability conditions distinguish known disabled from unknown state', () => {
  const s = sensor({ availability: { entity: 'binary_sensor.monitoring' } });
  const states = { 'sensor.ph': { state: '7.5' } };
  for (const value of ['unknown', 'unavailable', '', undefined]) {
    assert.equal(readSensor(s, { ...states, 'binary_sensor.monitoring': { state: value } }).reason, 'availability_unknown');
  }
  assert.equal(readSensor(s, { ...states, 'binary_sensor.monitoring': { state: 'off' } }).reason, 'disabled');
  assert.equal(readSensor(s, { ...states, 'binary_sensor.monitoring': { state: 'on' } }).value, 7.5);
  assert.equal(sensor({ availability: { entity: 'sensor.status', state: 'ready' } }).availability.state, 'ready');
});

test('sample timestamps require timezone and valid calendar/time fields', () => {
  for (const value of [null, 123, '123', '2026-11-14', '2026-11-14T12:00:00', '2026-02-30T12:00:00Z', '2026-11-14T24:00:00Z', '2026-11-14T12:00:61Z']) assert.equal(sampleTimestamp(value), null);
  assert.equal(sampleTimestamp('2026-11-14T04:00:00-08:00'), now);
  assert.equal(sampleTimestamp('2024-02-29T12:00:00Z'), Date.parse('2024-02-29T12:00:00Z'));
});

test('freshness requires explicit sample time and expires at the configured deadline', () => {
  const s = sensor({ freshness: { attribute: 'sampled_at', max_age: 60 } });
  const states = stamp => ({ 'sensor.ph': { state: '7.5', last_updated: '2026-11-14T12:00:00Z', attributes: { sampled_at: stamp } } });
  assert.equal(readSensor(s, states(undefined), now).reason, 'freshness_unknown');
  assert.equal(readSensor(s, states('2026-11-14T12:00:01Z'), now).reason, 'freshness_unknown');
  assert.equal(readSensor(s, states('2026-11-14T11:59:00Z'), now).reason, 'stale');
  const valid = readSensor(s, states('2026-11-14T11:59:01Z'), now);
  assert.equal(valid.value, 7.5); assert.equal(valid.expiresAt, now + 1000);
  assert.equal(readSensor(sensor({}), states(undefined), now).value, 7.5);
});

test('separate sample-time entity supports unchanged samples without using transport age', () => {
  const s = sensor({ freshness: { entity: 'sensor.sample_time', max_age: 60 } });
  const states = { 'sensor.ph': { state: '7.5', last_changed: '2020-01-01T00:00:00Z' }, 'sensor.sample_time': { state: '2026-11-14T12:00:00Z' } };
  assert.equal(readSensor(s, states, now).value, 7.5);
  assert.equal(readSensor(s, states, now + 60000).reason, 'stale');
  assert.equal(readSensor(s, { ...states, 'sensor.sample_time': { state: 'unavailable' } }, now).reason, 'freshness_unknown');
});

test('source, availability and freshness settings validate known fields', () => {
  for (const options of [
    { attribute: '' }, { attribute: null }, { availability: null },
    { availability: { entity: 'bad' } }, { availability: { entity: 'sensor.x', state: null } },
    { availability: { entity: 'sensor.x', state: 'unknown' } },
    { freshness: {} }, { freshness: { attribute: 'sampled_at', max_age: 0 } },
    { freshness: { entity: 'sensor.timestamp', max_age: '60' } },
    { freshness: { entity: 'sensor.timestamp', max_age: Infinity } },
  ]) assert.throws(() => sensor(options), /sensors.ph/);
  const options = { freshness: { entity: 'sensor.time', max_age: 60, extension: 0 }, availability: { entity: 'sensor.status', state: 'ready' } };
  const before = structuredClone(options); sensor(options); assert.deepEqual(options, before);
});
