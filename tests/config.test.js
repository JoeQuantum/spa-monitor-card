import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveConfig } from '../src/config.js';
import { SENSOR_PRESETS, getIndicatorPosition, getGaugeStatus } from '../src/sensors.js';

const ph = (options = {}) => ({ sensors: { ph: { entity: 'sensor.ph', ...options } } });

test('nested shapes fail with actionable paths, not runtime property errors', () => {
  for (const [input, path] of [
    [null, 'config'], [[], 'config'], [new Date(), 'config'], [{}, 'sensors'],
    [{ sensors: null }, 'sensors'], [{ sensors: [] }, 'sensors'], [{ sensors: {} }, 'sensors'],
    [{ sensors: { ph: null } }, 'sensors.ph'], [{ sensors: { ph: [] } }, 'sensors.ph'],
    [{ ...ph(), controls: null }, 'controls'], [{ ...ph(), controls: [] }, 'controls'],
    [{ ...ph(), controls: { boost: false } }, 'controls.boost'],
    [{ ...ph(), controls: { typo: {} } }, 'controls.typo'],
    [{ ...ph(), title: 4 }, 'title'], [{ ...ph(), theme: null }, 'theme'],
  ]) assert.throws(() => resolveConfig(input), error => error.message.startsWith(path));
});

test('known entities require matching domains without requiring HA to load them', () => {
  for (const id of ['number.ph', '', 'sensor.', 'sensor.ph extra', 'sensor.ph\n', 'Sensor.ph', null, 3]) {
    assert.throws(() => resolveConfig(ph({ entity: id })), /sensors.ph.entity/);
  }
  for (const [id, domain] of [['boost', 'switch'], ['output_level', 'number']]) {
    assert.equal(resolveConfig({ ...ph(), controls: { [id]: { entity: `${domain}.not_loaded`, extension: 0 } } }).controls[id].extension, 0);
    assert.throws(() => resolveConfig({ ...ph(), controls: { [id]: { entity: 'sensor.wrong' } } }), new RegExp(`controls.${id}.entity`));
  }
});

test('finite bounds, precision, labels and supported enums are validated', () => {
  for (const [field, values] of Object.entries({
    min: [null, '6', NaN, Infinity], max: [null, '9', NaN, Infinity],
    decimals: [-1, .5, 101, null, '2'], gradient: [null, '', 'rainbow'],
    display_format: ['', 'date', 1], name: ['', null, 7], unit: [null, 7], setpoint: [null, Infinity],
  })) for (const value of values) assert.throws(() => resolveConfig(ph({ [field]: value })), new RegExp(`sensors.ph.${field}`));
  assert.throws(() => resolveConfig(ph({ min: 9, max: 6 })), /min < max/);
  assert.throws(() => resolveConfig(ph({ min: -1e308, max: 1e308 })), /finite span/);
  for (const format of [null, 'numeric', 'hours_to_months']) assert.equal(resolveConfig(ph({ display_format: format })).sensors.ph.display_format, format);
});

test('valid zero settings and unknown extensions survive without input or preset mutation', () => {
  const input = { title: '', card_mod: { style: 'test' }, sensors: { iq_sensor: { entity: 'sensor.iq', min: 0, decimals: 0, hours_reserve: 0, extension: { enabled: false } } } };
  const before = structuredClone(input), presets = structuredClone(SENSOR_PRESETS);
  const resolved = resolveConfig(input);
  assert.equal(resolved.sensors.iq_sensor.hours_reserve, 0);
  assert.equal(resolved.sensors.iq_sensor.zones.at(-1).value, 0);
  assert.deepEqual(resolved.card_mod, input.card_mod);
  assert.deepEqual(resolved.sensors.iq_sensor.extension, { enabled: false });
  resolved.sensors.iq_sensor.zones[0].value = 999;
  assert.deepEqual(input, before);
  assert.deepEqual(SENSOR_PRESETS, presets);
});

test('custom sensors need a name and complete scale, with explicit linear support', () => {
  const base = { entity: 'sensor.custom', name: 'Custom' };
  assert.throws(() => resolveConfig({ sensors: { custom: base } }), /sensors.custom.min/);
  const custom = resolveConfig({ sensors: { custom: { ...base, min: 0, max: 20 } } }).sensors.custom;
  assert.equal(getIndicatorPosition(10, custom), 50);
  const linear = resolveConfig(ph({ min: 0, max: 10, zones: null })).sensors.ph;
  assert.equal(getIndicatorPosition(5, linear), 50);
  const declared = resolveConfig(ph({ zones: [{ value: 10, position: 0 }, { value: 0, position: 100 }] })).sensors.ph;
  assert.equal(declared.min, 0); assert.equal(declared.max, 10);
});

test('zones reject duplicate, unordered, mismatched and nonfinite breakpoints', () => {
  for (const bad of [[], {}, [null, {}], [undefined, {}], new Array(2),
    [{ value: 9, position: 0 }, { value: 9, position: 100 }],
    [{ value: 6, position: 0 }, { value: 9, position: 100 }],
    [{ value: 9, position: 0 }, { value: 6, position: 0 }],
    [{ value: 9, position: 10 }, { value: 6, position: 100 }],
    [{ value: 9, position: 0 }, { value: 6, position: 101 }],
    [{ value: Infinity, position: 0 }, { value: 6, position: 100 }],
  ]) assert.throws(() => resolveConfig(ph({ zones: bad })), /sensors.ph.zones/);
  assert.throws(() => resolveConfig(ph({ min: 5, zones: [{ value: 9, position: 0 }, { value: 6, position: 100 }] })), /endpoints/);
  assert.throws(() => resolveConfig(ph({ min: 7 })), /sensors.ph.zones/);
});

test('preset endpoint overrides preserve interior thresholds and interpolate their new ends', () => {
  const sensor = resolveConfig({ sensors: { chlorine: { entity: 'sensor.cl', max: 20 } } }).sensors.chlorine;
  assert.equal(getIndicatorPosition(5, sensor), 80);
  assert.equal(getIndicatorPosition(1, sensor), 20);
  assert.ok(Math.abs(getIndicatorPosition(12, sensor) - 93.3333333333) < 1e-6);
  assert.equal(getIndicatorPosition(20, sensor), 95);
});

test('textual band boundaries agree with the scale and identify out-of-range values', () => {
  const sensor = resolveConfig(ph()).sensors.ph;
  for (const value of [7.2, 7.5, 7.8]) assert.equal(getGaugeStatus(value, sensor), 'Within configured target band');
  assert.equal(getGaugeStatus(6.8, sensor), 'Low (configured yellow band)');
  assert.equal(getGaugeStatus(8.2, sensor), 'High (configured yellow band)');
  assert.equal(getGaugeStatus(5, sensor), 'Below displayed range');
  assert.equal(getGaugeStatus(10, sensor), 'Above displayed range');
  for (const value of [508, 654, 1969, 10000]) assert.ok(!/expired|safe/i.test(getGaugeStatus(value, SENSOR_PRESETS.iq_sensor)));
});
