/**
 * Predefined sensor configurations for spa water care monitoring.
 * Users can override any value in their YAML config.
 *
 * Gradient types (standard, depletion) are defined as CSS classes
 * in styles.js to allow CSS custom property resolution.
 *
 * Each sensor has a `zones` array that maps sensor values to bar
 * positions using piecewise linear interpolation. Position is from
 * top (0 = top of bar, 100 = bottom of bar).
 */

export const SENSOR_PRESETS = {
  chlorine: {
    name: 'Chlorine',
    unit: 'ppm',
    min: 0,
    max: 10,
    setpoint: 3,
    decimals: 1,
    gradient: 'standard',
    zones: [
      { value: 10.0, position: 0 },
      { value: 8.0, position: 10 },
      { value: 5.0, position: 20 },
      { value: 1.0, position: 80 },
      { value: 0.5, position: 90 },
      { value: 0.0, position: 100 },
    ],
  },
  ph: {
    name: 'pH',
    unit: '',
    min: 6.0,
    max: 9.0,
    setpoint: 7.5,
    decimals: 1,
    gradient: 'standard',
    zones: [
      { value: 9.0, position: 0 },
      { value: 8.2, position: 10 },
      { value: 7.8, position: 20 },
      { value: 7.2, position: 80 },
      { value: 6.8, position: 90 },
      { value: 6.0, position: 100 },
    ],
  },
  salt: {
    name: 'Salt',
    unit: 'ppm',
    min: 1000,
    max: 3000,
    setpoint: 1750,
    decimals: 0,
    gradient: 'standard',
    zones: [
      { value: 3000, position: 0 },
      { value: 2500, position: 10 },
      { value: 2000, position: 20 },
      { value: 1500, position: 80 },
      { value: 1250, position: 90 },
      { value: 1000, position: 100 },
    ],
  },
  iq_sensor: {
    name: 'IQ Sensor',
    unit: 'hours',
    min: 0,
    max: 10000,
    setpoint: 5000,
    decimals: 0,
    gradient: 'depletion',
    display_format: 'hours_to_months',
    zones: [
      { value: 10000, position: 0 },
      { value: 1460, position: 80 },
      { value: 146, position: 90 },
      { value: 0, position: 100 },
    ],
  },
};

/**
 * Calculate indicator position as a percentage from bottom (0-100)
 * using piecewise linear interpolation between zone breakpoints.
 * Clamped to 5-95% for visual padding.
 *
 * @param {number} value - Current sensor value.
 * @param {Object} sensor - Resolved sensor config with zones, min, max.
 * @returns {number} Position as percentage from bottom (5-95).
 */
export function getIndicatorPosition(value, sensor) {
  const zones = sensor.zones;
  if (!zones || zones.length < 2) {
    const clamped = Math.max(sensor.min, Math.min(sensor.max, value));
    const pct = ((clamped - sensor.min) / (sensor.max - sensor.min)) * 100;
    return Math.max(5, Math.min(95, pct));
  }

  const maxVal = zones[0].value;
  const minVal = zones[zones.length - 1].value;
  const clamped = Math.max(minVal, Math.min(maxVal, value));

  for (let i = 0; i < zones.length - 1; i++) {
    const upper = zones[i];
    const lower = zones[i + 1];
    if (clamped <= upper.value && clamped >= lower.value) {
      const t = (upper.value === lower.value)
        ? 0
        : (clamped - lower.value) / (upper.value - lower.value);
      const posFromTop = lower.position + t * (upper.position - lower.position);
      return Math.max(5, Math.min(95, 100 - posFromTop));
    }
  }

  return 50;
}
