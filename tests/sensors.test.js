import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SENSOR_PRESETS, getIndicatorPosition } from '../src/sensors.js';

test('the four water-care presets have finite ordered scales', () => {
  assert.deepEqual(Object.keys(SENSOR_PRESETS), ['chlorine', 'ph', 'salt', 'iq_sensor']);
  for (const preset of Object.values(SENSOR_PRESETS)) {
    assert.ok(preset.min < preset.max);
    for (let i = 0; i < preset.zones.length; i++) {
      const zone = preset.zones[i];
      assert.ok(Number.isFinite(zone.value) && Number.isFinite(zone.position));
      if (i) {
        assert.ok(zone.value < preset.zones[i - 1].value);
        assert.ok(zone.position > preset.zones[i - 1].position);
      }
      assert.equal(getIndicatorPosition(zone.value, preset), Math.max(5, Math.min(95, 100 - zone.position)));
    }
  }
});

test('piecewise interpolation agrees at each segment midpoint', () => {
  for (const preset of Object.values(SENSOR_PRESETS)) {
    for (let i = 1; i < preset.zones.length; i++) {
      const a = preset.zones[i - 1], b = preset.zones[i];
      const expected = Math.max(5, Math.min(95, 100 - (a.position + b.position) / 2));
      assert.ok(Math.abs(getIndicatorPosition((a.value + b.value) / 2, preset) - expected) < 1e-9);
    }
  }
});

test('extreme finite readings clamp to the ends instead of escaping the card', () => {
  for (const preset of Object.values(SENSOR_PRESETS)) {
    assert.equal(getIndicatorPosition(preset.min - 100, preset), 5);
    assert.equal(getIndicatorPosition(preset.max + 100, preset), 95);
  }
});

test('custom scales without zones use their own bounds', () => {
  const scale = { min: 10, max: 30 };
  assert.equal(getIndicatorPosition(20, scale), 50);
  assert.equal(getIndicatorPosition(15, scale), 25);
  assert.equal(getIndicatorPosition(30, scale), 95);
});
