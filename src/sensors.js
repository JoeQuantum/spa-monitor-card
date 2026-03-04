/**
 * Predefined sensor configurations for spa water care monitoring.
 * Users can override any value in their YAML config.
 *
 * Gradient types (standard, depletion) are defined as CSS classes
 * in styles.js to allow CSS custom property resolution.
 */

export const SENSOR_PRESETS = {
  chlorine: {
    name: 'Chlorine',
    unit: 'ppm',
    min: 0,
    max: 10,
    setpoint: 3,
    decimals: 1,
    gradient: 'chlorine',
  },
  ph: {
    name: 'pH',
    unit: '',
    min: 6.0,
    max: 9.0,
    setpoint: 7.5,
    decimals: 1,
    gradient: 'ph',
  },
  salt: {
    name: 'Salt',
    unit: 'ppm',
    min: 1000,
    max: 3000,
    setpoint: 1750,
    decimals: 0,
    gradient: 'salt',
  },
  iq_sensor: {
    name: 'IQ Sensor',
    unit: 'hours',
    min: 0,
    max: 10000,
    setpoint: 5000,
    decimals: 0,
    gradient: 'iq-sensor',
    display_format: 'hours_to_months',
  },
};

/**
 * Calculate indicator position as a percentage (0-100) from bottom.
 */
export function getIndicatorPosition(value, min, max) {
  const clamped = Math.max(min, Math.min(max, value));
  return ((clamped - min) / (max - min)) * 100;
}
