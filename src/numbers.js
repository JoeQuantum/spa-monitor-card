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
