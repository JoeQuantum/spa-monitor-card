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
    max: 6,
    setpoint: 3,
    decimals: 1,
    gradient: 'standard',
  },
  ph: {
    name: 'pH',
    unit: '',
    min: 7.0,
    max: 8.0,
    setpoint: 7.5,
    decimals: 1,
    gradient: 'standard',
  },
  salt: {
    name: 'Salt',
    unit: 'ppm',
    min: 1200,
    max: 2400,
    setpoint: 1800,
    decimals: 0,
    gradient: 'standard',
  },
  iq_sensor: {
    name: 'IQ Sensor',
    unit: '',
    min: 0,
    max: 10000,
    setpoint: 5000,
    decimals: 0,
    gradient: 'depletion',
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
