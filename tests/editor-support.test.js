import { test } from 'node:test';
import assert from 'node:assert/strict';
import { editorEntities, editorScope } from '../src/editor-support.js';

const hass = { states: { 'sensor.a': {}, 'sensor.b': {}, 'sensor.helper': {}, 'switch.a': {} }, entities: { 'sensor.a': { device_id: 'first' }, 'switch.a': { device_id: 'first' }, 'sensor.b': { device_id: 'second' } } };
const config = { sensors: { ph: { entity: 'sensor.a' } } };
test('entity suggestions follow registry device identity and retain existing helpers', () => {
  assert.equal(editorScope(config, hass).deviceId, 'first');
  assert.deepEqual(editorEntities(config, hass, ['sensor']), ['sensor.a']);
  assert.deepEqual(editorEntities(config, hass, ['sensor'], 'sensor.helper'), ['sensor.a', 'sensor.helper']);
  assert.deepEqual(editorEntities(config, hass, ['switch']), ['switch.a']);
});
test('mixed-device configurations do not silently choose a device', () => {
  const mixed = { sensors: { ph: { entity: 'sensor.a' }, salt: { entity: 'sensor.b' } } };
  assert.equal(editorScope(mixed, hass).mixed, true);
  assert.deepEqual(editorEntities(mixed, hass, ['sensor']), []);
  assert.deepEqual(editorEntities({ ...mixed, device_id: 'second' }, hass, ['sensor']), ['sensor.b']);
  assert.deepEqual(editorEntities({ ...config, device_id: 'first' }, { states: hass.states }, ['sensor'], 'sensor.a'), ['sensor.a']);
});
test('attribute sources allow other domains while explicit scope preserves existing selections', () => {
  const scoped = { ...config, device_id: 'second' };
  assert.equal(editorScope(scoped, hass).mixed, true);
  assert.deepEqual(editorEntities(scoped, hass, undefined, 'switch.a'), ['sensor.b', 'switch.a']);
  assert.deepEqual(editorEntities(config, { states: hass.states }, ['sensor']), ['sensor.a', 'sensor.b', 'sensor.helper']);
});

test('nested option patches preserve extensions, explicit blanks and numeric zero without mutating input', async () => {
  const { patchSensorOption } = await import('../src/editor-support.js');
  const config = { extension: true, sensors: { ph: { entity: 'sensor.a', freshness: { attribute: 'sampled_at', max_age: 60, extension: 0 } } } };
  const before = structuredClone(config);
  let next = patchSensorOption(config, 'ph', ['freshness', 'max_age'], 120);
  next = patchSensorOption(next, 'ph', ['decimals'], 0);
  next = patchSensorOption(next, 'ph', ['unit'], '');
  assert.equal(next.sensors.ph.decimals, 0); assert.equal(next.sensors.ph.unit, '');
  assert.deepEqual(next.sensors.ph.freshness, { attribute: 'sampled_at', max_age: 120, extension: 0 });
  next = patchSensorOption(next, 'ph', ['freshness', 'attribute'], undefined, true);
  assert.deepEqual(next.sensors.ph.freshness, { max_age: 120, extension: 0 });
  assert.deepEqual(config, before);
  const special = patchSensorOption(config, '__proto__', ['entity'], 'sensor.x');
  assert.ok(Object.hasOwn(special.sensors, '__proto__'));
  assert.equal(Object.getPrototypeOf(special.sensors), Object.prototype);
});

test('device options preserve an explicit offline device and prefer user labels', async () => {
  const { editorDevices } = await import('../src/editor-support.js');
  const devices = editorDevices({ device_id: 'offline' }, { ...hass, devices: { first: { name: 'Original', name_by_user: 'Aria' } } });
  assert.deepEqual(devices, [{ id: 'first', name: 'Aria' }, { id: 'offline', name: 'offline' }, { id: 'second', name: 'second' }]);
  // Invalid YAML must remain editable, not throw while sorting picker options.
  assert.deepEqual(editorDevices({ device_id: 42 }, {}), []);
});
