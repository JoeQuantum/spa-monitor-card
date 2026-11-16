import { SENSOR_PRESETS } from './sensors.js';

const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const fail = (path, message) => { throw new Error(`${path} ${message}`); };
const object = (value, path) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)
      || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) fail(path, 'must be an object.');
};
const finite = (value, path) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) fail(path, 'must be a finite number.');
};
const text = (value, path, empty = true) => {
  if (typeof value !== 'string' || (!empty && !value.trim())) fail(path, empty ? 'must be a string.' : 'must be a nonempty string.');
};
const entity = (value, path, domain) => {
  if (typeof value !== 'string' || value.trim() !== value || !new RegExp(`^${domain}\\.[a-z0-9_]+$`).test(value)) {
    fail(path, domain.startsWith('[') ? 'must be a Home Assistant entity ID (for example sensor.spa).' : `must be a ${domain} entity ID (for example ${domain}.spa).`);
  }
};

function zones(value, path) {
  if (!Array.isArray(value) || value.length < 2) fail(path, 'must contain at least two breakpoints.');
  const result = Array.from(value, (zone, i) => {
    object(zone, `${path}[${i}]`);
    finite(zone.value, `${path}[${i}].value`);
    finite(zone.position, `${path}[${i}].position`);
    if (zone.position < 0 || zone.position > 100) fail(`${path}[${i}].position`, 'must be between 0 and 100.');
    return { ...zone };
  });
  if (result[0].position !== 0 || result.at(-1).position !== 100) fail(path, 'must start at position 0 and end at 100 (top to bottom).');
  for (let i = 1; i < result.length; i++) {
    if (result[i].value >= result[i - 1].value || result[i].position <= result[i - 1].position) {
      fail(`${path}[${i}]`, 'must have a lower value and a higher position than the previous breakpoint.');
    }
  }
  return result;
}

/** Resolve explicit sources without consulting HA or inferring measurement age. */
function readingSource(input, path) {
  object(input, path);
  const source = { ...input };
  if (own(source, 'attribute')) text(source.attribute, `${path}.attribute`, false);
  entity(source.entity, `${path}.entity`, own(source, 'attribute') ? '[a-z_][a-z0-9_]*' : 'sensor');
  if (own(source, 'availability')) {
    object(source.availability, `${path}.availability`);
    entity(source.availability.entity, `${path}.availability.entity`, '[a-z_][a-z0-9_]*');
    const state = own(source.availability, 'state') ? source.availability.state : 'on';
    text(state, `${path}.availability.state`, false);
    if (['unknown', 'unavailable'].includes(state)) fail(`${path}.availability.state`, 'must identify a known available state.');
    source.availability = { ...source.availability, state };
  }
  if (own(source, 'freshness')) {
    object(source.freshness, `${path}.freshness`);
    const freshness = { ...source.freshness };
    if (own(freshness, 'entity')) entity(freshness.entity, `${path}.freshness.entity`, '[a-z_][a-z0-9_]*');
    if (own(freshness, 'attribute')) text(freshness.attribute, `${path}.freshness.attribute`, false);
    if (!own(freshness, 'entity') && !own(freshness, 'attribute')) fail(`${path}.freshness`, 'requires an explicit sample-time entity or attribute.');
    finite(freshness.max_age, `${path}.freshness.max_age`);
    if (freshness.max_age <= 0 || !Number.isFinite(freshness.max_age * 1000)) fail(`${path}.freshness.max_age`, 'must be a positive finite duration in seconds.');
    source.freshness = freshness;
  }
  return source;
}

function sensorConfig(id, input) {
  const path = `sensors.${id}`;
  object(input, path);
  const preset = own(SENSOR_PRESETS, id) ? SENSOR_PRESETS[id] : {};
  const sensor = readingSource({ unit: '', decimals: 1, gradient: 'standard', display_format: null, ...preset, ...input }, path);
  text(sensor.name, `${path}.name`, false);
  text(sensor.unit, `${path}.unit`);
  if (!Number.isInteger(sensor.decimals) || sensor.decimals < 0 || sensor.decimals > 100) fail(`${path}.decimals`, 'must be an integer from 0 to 100.');
  if (!['standard', 'depletion'].includes(sensor.gradient)) fail(`${path}.gradient`, 'must be standard or depletion.');
  if (![null, 'numeric', 'hours_to_months'].includes(sensor.display_format)) fail(`${path}.display_format`, 'must be null, numeric or hours_to_months.');
  if (own(sensor, 'setpoint')) finite(sensor.setpoint, `${path}.setpoint`);
  if (own(sensor, 'trend')) {
    const trendPath = `${path}.trend`;
    const trend = readingSource(sensor.trend, trendPath);
    text(trend.unit, `${trendPath}.unit`, false);
    if (trend.unit.trim() !== trend.unit || !/^.*\/(s|min|h|d)$/.test(trend.unit)) fail(`${trendPath}.unit`, 'must declare a rate unit ending in /s, /min, /h or /d (for example ppm/h or /h for unitless readings).');
    if (!own(trend, 'deadband')) trend.deadband = 0;
    if (!own(trend, 'hysteresis')) trend.hysteresis = 0;
    if (!own(trend, 'decimals')) trend.decimals = 2;
    finite(trend.deadband, `${trendPath}.deadband`);
    finite(trend.hysteresis, `${trendPath}.hysteresis`);
    if (trend.deadband < 0) fail(`${trendPath}.deadband`, 'must be non-negative in the declared rate unit.');
    if (trend.hysteresis < 0 || trend.hysteresis > trend.deadband || !Number.isFinite(trend.deadband + trend.hysteresis)) fail(`${trendPath}.hysteresis`, 'must be between zero and deadband with a finite sum.');
    if (!Number.isInteger(trend.decimals) || trend.decimals < 0 || trend.decimals > 6) fail(`${trendPath}.decimals`, 'must be an integer from 0 to 6.');
    sensor.trend = trend;
  }
  if (own(sensor, 'tap_action')) {
    object(sensor.tap_action, `${path}.tap_action`);
    if (!['none', 'more-info'].includes(sensor.tap_action.action)) fail(`${path}.tap_action.action`, 'must be none or more-info.');
    if (own(sensor.tap_action, 'entity')) entity(sensor.tap_action.entity, `${path}.tap_action.entity`, '[a-z_][a-z0-9_]*');
    sensor.tap_action = { ...sensor.tap_action };
  }

  if (input.zones === null) {
    sensor.zones = null; // Explicit opt-in to a linear min/max scale.
  } else if (own(input, 'zones')) {
    sensor.zones = zones(input.zones, `${path}.zones`);
    // An explicit scale supplies bounds unless the user also declares them.
    if (!own(input, 'min')) sensor.min = sensor.zones.at(-1).value;
    if (!own(input, 'max')) sensor.max = sensor.zones[0].value;
  } else if (preset.zones) {
    sensor.zones = preset.zones.map(zone => ({ ...zone }));
    // Keep all interior thresholds; only the outer ends follow min/max overrides.
    sensor.zones[0].value = sensor.max;
    sensor.zones.at(-1).value = sensor.min;
  }
  finite(sensor.min, `${path}.min`);
  finite(sensor.max, `${path}.max`);
  if (sensor.min >= sensor.max || !Number.isFinite(sensor.max - sensor.min)) fail(path, 'requires min < max with a finite span.');
  if (sensor.zones) {
    sensor.zones = zones(sensor.zones, `${path}.zones`);
    if (sensor.zones[0].value !== sensor.max || sensor.zones.at(-1).value !== sensor.min) {
      fail(`${path}.zones`, 'endpoints must equal max and min; supply matching bounds or omit them.');
    }
  }

  if (sensor.display_format === 'hours_to_months' || own(sensor, 'hours_per_month')) {
    const divisor = sensor.hours_per_month === undefined ? 730.5 : sensor.hours_per_month;
    if (typeof divisor !== 'number' || !Number.isFinite(divisor) || divisor <= 0) fail(`${path}.hours_per_month`, 'must be a finite number greater than zero.');
    sensor.hours_per_month = divisor;
  }
  if (sensor.display_format === 'hours_to_months' || own(sensor, 'hours_reserve')) {
    const reserve = sensor.hours_reserve === undefined ? 0 : sensor.hours_reserve;
    if (typeof reserve !== 'number' || !Number.isFinite(reserve) || reserve < 0) fail(`${path}.hours_reserve`, 'must be a finite non-negative number.');
    sensor.hours_reserve = reserve;
  }
  return sensor;
}

/** Validate without looking up loaded HA entities or mutating the caller's YAML. */
export function resolveConfig(config) {
  object(config, 'config');
  object(config.sensors, 'sensors');
  if (Object.keys(config.sensors).length === 0) fail('sensors', 'must define at least one sensor.');
  if (own(config, 'title')) text(config.title, 'title');
  if (own(config, 'device_id')) text(config.device_id, 'device_id', false);
  if (own(config, 'theme') && !['auto', 'light', 'dark', 'glass'].includes(config.theme)) fail('theme', 'must be auto, light, dark or glass.');
  const controls = {};
  if (own(config, 'controls')) {
    object(config.controls, 'controls');
    for (const [id, control] of Object.entries(config.controls)) {
      if (!['output_level', 'boost'].includes(id)) fail(`controls.${id}`, 'is unsupported; use output_level or boost.');
      object(control, `controls.${id}`);
      entity(control.entity, `controls.${id}.entity`, id === 'boost' ? 'switch' : 'number');
      controls[id] = { ...control };
    }
  }
  return {
    ...config, title: config.title ?? '', theme: config.theme ?? 'auto', controls,
    sensors: Object.fromEntries(Object.entries(config.sensors).map(([id, value]) => [id, sensorConfig(id, value)])),
  };
}
