/** Registry identity scopes suggestions; labels never identify a spa. */
export function editorScope(config, hass) {
  const entries = [...Object.values(config.sensors || {}), ...Object.values(config.controls || {})];
  const devices = new Set(entries.map(item => hass.entities?.[item?.entity]?.device_id).filter(Boolean));
  const explicit = config.device_id;
  return {
    deviceId: explicit || (devices.size === 1 ? [...devices][0] : null),
    mixed: explicit ? [...devices].some(id => id !== explicit) : devices.size > 1,
    registryReady: !!hass.entities,
  };
}

export function editorEntities(config, hass, domains, current = '') {
  const scope = editorScope(config, hass);
  const candidates = Object.keys(hass.states || {}).filter(id => {
    if (domains && !domains.includes(id.split('.')[0])) return false;
    if (scope.mixed && !config.device_id) return false;
    return !scope.deviceId || hass.entities?.[id]?.device_id === scope.deviceId;
  });
  // Keep an existing helper or offline selection visible without recommending it
  // for another field or rewriting any configured entities.
  if (current && !candidates.includes(current)) candidates.push(current);
  return candidates.sort();
}

/** Patch raw YAML options without materializing defaults or losing extensions. */
export function patchSensorOption(config, id, path, value, remove = false) {
  const sensor = Object.hasOwn(config.sensors || {}, id) ? config.sensors[id] : {};
  const patch = (object, [key, ...rest]) => {
    const next = { ...object };
    if (rest.length) return { ...next, [key]: patch(Object.hasOwn(next, key) ? next[key] : {}, rest) };
    if (remove) delete next[key]; else return { ...next, [key]: value };
    return next;
  };
  const next = patch(sensor, path);
  return { ...config, sensors: { ...config.sensors, [id]: next } };
}

export function editorDevices(config, hass) {
  const ids = new Set([
    ...Object.keys(hass.devices || {}),
    ...Object.values(hass.entities || {}).map(entity => entity?.device_id).filter(id => typeof id === 'string' && id),
    ...(typeof config.device_id === 'string' && config.device_id ? [config.device_id] : []),
  ]);
  return [...ids].map(id => {
    const device = hass.devices?.[id];
    return { id, name: String(device?.name_by_user || device?.name || id) };
  }).sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
}
