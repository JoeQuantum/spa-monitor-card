/** Parse a complete decimal state, never a numeric prefix or an empty value. */
export function finiteNumber(value) {
  if (typeof value === 'string') {
    const text = value.trim();
    if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) return null;
    value = Number(text);
  }
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/** Validate the reported value and the number entity's current constraints. */
export function numberState(state) {
  const value = finiteNumber(state?.state);
  const attrs = state?.attributes || {};
  const min = finiteNumber(attrs.min === undefined ? 0 : attrs.min);
  const max = finiteNumber(attrs.max === undefined ? 10 : attrs.max);
  const step = finiteNumber(attrs.step === undefined ? 1 : attrs.step);
  if ([value, min, max, step].includes(null) || min >= max || step <= 0
      || value < min || value > max || !Number.isFinite((max - min) / step)) return null;
  return { value, min, max, step };
}

/** Adjacent step on the min-anchored grid, including fractional/off-grid reports. */
export function nextNumberStep(value, direction, { min, max, step }) {
  const ticks = (value - min) / step;
  const tolerance = Number.EPSILON * Math.max(1, Math.abs(ticks)) * 8;
  const index = direction > 0
    ? Math.floor(ticks + tolerance) + 1
    : Math.ceil(ticks - tolerance) - 1;
  const last = Math.floor((max - min) / step + tolerance);
  // Round binary floating-point noise, e.g. 0.1 + 0.2, before sending JSON.
  const next = Number((min + Math.max(0, Math.min(last, index)) * step).toPrecision(15));
  if (!Number.isFinite(next) || next < min || next > max
      || (direction > 0 ? next <= value : next >= value)) return null;
  return next;
}
