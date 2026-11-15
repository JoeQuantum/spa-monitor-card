import { finiteNumber } from './numbers.js';

const unavailable = state => !state || ['unknown', 'unavailable', undefined, null, ''].includes(state.state);
const unknown = (reason, status) => ({ value: null, reason, status });

/** An explicit ISO timestamp with timezone, never a HA transport timestamp. */
export function sampleTimestamp(value) {
  if (typeof value !== 'string') return null;
  const parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!parts) return null;
  const [,year,month,day,hour,minute,second] = parts.map((part, i) => i > 0 && i < 7 ? Number(part) : part);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  if (month < 1 || month > 12 || day < 1 || day > days || hour > 23 || minute > 59 || second > 59) return null;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : null;
}

/** Read the configured quantity and fail closed on unknown availability/age. */
export function readSensor(sensor, states, now = Date.now()) {
  const source = states?.[sensor.entity];
  if (unavailable(source)) return unknown('unavailable', 'Source unavailable');
  if (sensor.availability) {
    const gate = states?.[sensor.availability.entity];
    if (unavailable(gate)) return unknown('availability_unknown', 'Availability unknown');
    if (gate.state !== sensor.availability.state) return unknown('disabled', 'Unavailable: availability condition not met');
  }
  const raw = sensor.attribute === undefined ? source.state : source.attributes?.[sensor.attribute];
  const value = finiteNumber(raw);
  if (value === null) return unknown('invalid', sensor.attribute === undefined ? 'Reading unavailable' : 'Attribute reading unavailable');
  if (!sensor.freshness) return { value };
  const clock = sensor.freshness.entity ? states?.[sensor.freshness.entity] : source;
  if (unavailable(clock)) return unknown('freshness_unknown', 'Sample time unavailable');
  const rawTime = sensor.freshness.attribute === undefined ? clock.state : clock.attributes?.[sensor.freshness.attribute];
  const sampledAt = sampleTimestamp(rawTime);
  if (sampledAt === null || !Number.isFinite(now) || sampledAt > now) return unknown('freshness_unknown', 'Sample time unknown or in the future');
  const expiresAt = sampledAt + sensor.freshness.max_age * 1000;
  if (now >= expiresAt) return unknown('stale', 'Stale sample');
  return { value, sampledAt, expiresAt };
}
