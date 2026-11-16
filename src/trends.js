import { readSensor } from './readings.js';

// Decimal configuration boundaries can differ by a few binary rounding bits.
const equalBoundary = (a, b) => Math.abs(a - b) <= Number.EPSILON * Math.max(Math.abs(a), Math.abs(b)) * 4;

/** Stateful deadband; thresholds use the explicitly declared derivative unit. */
export function trendDirection(value, options, previous = 'flat') {
  const enter = options.deadband + options.hysteresis;
  const leave = options.deadband - options.hysteresis;
  if (value > 0 && (value >= enter || equalBoundary(value, enter))) return 'rising';
  if (value < 0 && (-value >= enter || equalBoundary(-value, enter))) return 'falling';
  if (previous === 'rising' && value > leave && !equalBoundary(value, leave)) return 'rising';
  if (previous === 'falling' && value < -leave && !equalBoundary(-value, leave)) return 'falling';
  return 'flat';
}

/** Display a reported derivative, never derive a rate from browser updates. */
export function readTrend(options, states, primaryReading, previous, now = Date.now()) {
  if (!options || primaryReading.value === null) return null;
  const reading = readSensor(options, states, now);
  if (reading.value === null) return null;
  // An explicit unit contract is checked, not merely painted over a different
  // reported unit. A missing unit cannot establish the quantity being shown.
  if (states?.[options.entity]?.attributes?.unit_of_measurement !== options.unit) return null;
  return { ...reading, direction: trendDirection(reading.value, options, previous), unit: options.unit };
}

export function trendText(reading, decimals) {
  const magnitude = Math.abs(reading.value).toFixed(decimals);
  // Do not display a direction beside a rounded zero or imply that silence
  // means fresh water. The accessible description retains the reported rate.
  if (reading.direction === 'flat') {
    const rounded = reading.value.toFixed(decimals);
    return `${Number(rounded) === 0 ? (0).toFixed(decimals) : rounded} ${reading.unit}`;
  }
  return `${reading.direction === 'rising' ? 'Rising' : 'Falling'} ${Number(magnitude) === 0 ? '< ' + (10 ** -decimals).toFixed(decimals) : magnitude} ${reading.unit}`;
}
