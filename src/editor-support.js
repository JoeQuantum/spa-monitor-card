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
  let next = { ...sensor };
  if (path.length === 1) {
    if (remove) delete next[path[0]];
    else next = { ...next, [path[0]]: value };
  } else {
    let group = { ...next[path[0]] };
    if (remove) delete group[path[1]];
    else group = { ...group, [path[1]]: value };
    next = { ...next, [path[0]]: group };
  }
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
