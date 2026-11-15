import { LitElement, html, css } from 'lit-element';
import { SENSOR_PRESETS } from './sensors.js';
import { resolveConfig } from './config.js';
import { finiteNumber } from './numbers.js';
import { editorDevices, editorEntities, editorScope, patchSensorOption } from './editor-support.js';

const SENSOR_IDS = Object.keys(SENSOR_PRESETS);
const own = (object, key) => Object.hasOwn(object || {}, key);
const option = (object, key) => own(object, key) ? object[key] : undefined;

function fireEvent(node, type, detail) {
  node.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
}

class SpaMonitorCardEditor extends LitElement {
  static get properties() {
    return { hass: { type: Object }, _config: { type: Object }, _error: { type: String }, _pending: { type: Boolean } };
  }

  static get styles() {
    return css`
      .editor, .section, .fields { display: flex; flex-direction: column; gap: 14px; }
      .editor { padding: 16px 0; }
      .section-title { font-weight: 600; font-size: 14px; color: var(--primary-text-color); }
      .section, details { min-width: 0; }
      details { border-bottom: 1px solid var(--divider-color); }
      summary { padding: 10px 0; font-size: 14px; font-weight: 500; cursor: pointer; overflow-wrap: anywhere; }
      .fields { padding: 0 0 16px; }
      .field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
      .field label, .hint { font-size: 12px; color: var(--secondary-text-color); }
      .field label { font-weight: 500; }
      .hint { margin: 0; line-height: 1.5; }
      .pair { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; }
      input[type="text"], select {
        box-sizing: border-box; width: 100%; min-width: 0; padding: 10px;
        border: 1px solid var(--divider-color); border-radius: 4px;
        background: var(--card-background-color, #fff); color: var(--primary-text-color);
        font: inherit; font-size: 14px;
      }
      input[type="checkbox"] { margin: 0 8px 0 0; }
      .check { display: flex; align-items: center; font-size: 14px; }
      ha-entity-picker { display: block; min-width: 0; }
      button { align-self: flex-start; font: inherit; color: var(--primary-color); background: none; border: 0; padding: 6px 0; cursor: pointer; }
      :is(input, select, button, summary):focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
      .error { border-inline-start: 3px solid var(--error-color, #db4437); padding-inline-start: 10px; font-size: 14px; overflow-wrap: anywhere; }
      input[aria-invalid="true"] { border-color: var(--error-color, #db4437); }
      .field-error { color: var(--error-color, #db4437); font-size: 12px; overflow-wrap: anywhere; }
    `;
  }

  setConfig(config) {
    this._removedSensors ??= new Map();
    this._removedControls ??= new Map();
    this._removedOptions ??= new Map();
    this._openGroups ??= new Set([Object.keys(config.sensors || {})[0] || SENSOR_IDS[0]]);
    // HA may echo the last published config while an invalid local edit is open.
    // Keep that draft until it is corrected, discarded, or replaced by new YAML.
    if (this._pending && JSON.stringify(config) === this._acceptedKey) return;
    this._config = { ...config };
    this._acceptedConfig = this._config;
    this._acceptedKey = JSON.stringify(config);
    this._pending = false;
    this._error = this._validate(this._config);
  }

  _validate(config) {
    try { resolveConfig(config); return ''; }
    catch (error) { return error.message; }
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const scope = editorScope(this._config, this.hass);
    const devices = editorDevices(this._config, this.hass);
    const ids = [...new Set([...SENSOR_IDS, ...Object.keys(this._config.sensors || {}), ...this._removedSensors.keys()])];
    return html`
      <div class="editor">
        ${this._error ? html`<div class="error" role="alert">
          ${this._pending ? 'Changes not applied yet. ' : ''}${this._error}
          ${this._pending ? html`<p class="hint">Correct the fields before saving. HA still has the last accepted configuration.</p><button type="button" @click=${this._discardDraft}>Discard pending edits</button>` : ''}
        </div>` : ''}
        <div class="section">
          <div class="section-title">General</div>
          <div class="field">
            <label for="card-title">Title</label>
            <input type="text" id="card-title" .value=${this._config.title || ''} @input=${this._titleChanged}>
          </div>
          <div class="field">
            <label for="card-theme">Theme</label>
            <select id="card-theme" .value=${this._config.theme || 'auto'} @change=${this._themeChanged}>
              ${['auto', 'light', 'dark', 'glass'].map(theme => html`<option value=${theme} ?selected=${theme === (this._config.theme || 'auto')}>${theme[0].toUpperCase() + theme.slice(1)}</option>`)}
            </select>
          </div>
          <div class="field">
            <label for="device-scope">Device for entity suggestions</label>
            <select id="device-scope" .value=${this._config.device_id || ''} @change=${this._deviceChanged}>
              <option value="" ?selected=${!this._config.device_id}>Automatic from configured entities</option>
              ${devices.map(device => html`<option value=${device.id} ?selected=${this._config.device_id === device.id}>${device.name}${devices.some(other => other.id !== device.id && other.name === device.name) ? ` (${device.id})` : ''}</option>`)}
            </select>
            <p class="hint">Filters reading and control suggestions. Existing selections and explicitly chosen helper entities are retained.</p>
          </div>
          ${scope.mixed ? html`<div role="status">${this._config.device_id
            ? 'Some configured entities are outside the selected device. Suggestions follow that device; existing selections are retained.'
            : 'Configured entities span multiple devices. Choose a device for suggestions; existing selections are retained.'}</div>` : ''}
        </div>
        <div class="section">
          <div class="section-title">Sensors</div>
          <p class="hint">Open a sensor to edit its options. Blank overrides use the preset; a blank unit hides the unit. Custom breakpoints and extension options are preserved from YAML.</p>
          ${ids.map(id => this._renderSensorGroup(id))}
        </div>
        <div class="section">
          <div class="section-title">Controls</div>
          ${this._controlPicker('output_level', 'Output Level Entity', 'number')}
          ${this._controlPicker('boost', 'Boost Entity', 'switch')}
        </div>
      </div>
    `;
  }

  _renderSensorGroup(id) {
    const sensor = option(this._config.sensors, id);
    const options = sensor || this._removedSensors.get(id) || {};
    const preset = option(SENSOR_PRESETS, id) || {};
    const name = options.name || preset.name || id;
    const domains = options.attribute === undefined ? ['sensor'] : undefined;
    const estimated = (own(sensor, 'display_format') ? sensor.display_format : preset.display_format) === 'hours_to_months';
    return html`
      <details data-sensor=${id} .open=${this._openGroups.has(id)} @toggle=${event => {
        if (event.target.open) this._openGroups.add(id); else this._openGroups.delete(id);
      }}>
        <summary>${name}</summary>
        <div class="fields">
          <div class="field">
            <label>${name} Entity</label>
            <ha-entity-picker data-primary aria-label=${`${name} Entity`} .hass=${this.hass}
              .value=${sensor?.entity || ''} .includeDomains=${domains}
              .includeEntities=${editorEntities(this._config, this.hass, domains, sensor?.entity)}
              allow-custom-entity @value-changed=${event => this._sensorChanged(id, event)}>
            </ha-entity-picker>
          </div>
          ${sensor ? html`
            ${this._field(id, ['name'], 'Label', { fallback: preset.name })}
            ${this._field(id, ['unit'], 'Unit', { fallback: preset.unit, keepEmpty: true })}
            ${own(sensor, 'unit') ? html`<button type="button" @click=${() => this._optionChanged(id, ['unit'], undefined, true)}>Use default unit</button>` : ''}
            <div class="pair">
              ${this._field(id, ['min'], 'Minimum', { number: true, fallback: preset.min })}
              ${this._field(id, ['max'], 'Maximum', { number: true, fallback: preset.max })}
            </div>
            <label class="check"><input type="checkbox" .checked=${sensor.zones === null}
              @change=${event => this._linearChanged(id, event.target.checked)}>Use a linear scale</label>
            ${Array.isArray(sensor.zones) ? html`<p class="hint">Custom breakpoints are configured in YAML. Their endpoints must match any minimum and maximum overrides.</p>` : ''}
            ${this._field(id, ['decimals'], 'Decimal places', { number: true, fallback: preset.decimals ?? 1 })}
            ${this._select(id, ['gradient'], 'Gradient', [['', 'Use preset'], ['standard', 'Standard'], ['depletion', 'Depletion']])}
            ${this._select(id, ['display_format'], 'Display format', [['', 'Use preset'], ['numeric', 'Number'], ['hours_to_months', 'Estimated months']])}
            ${estimated || own(sensor, 'hours_reserve') || own(sensor, 'hours_per_month') ? html`
              <div class="pair">
                ${this._field(id, ['hours_reserve'], 'Reserve hours', { number: true, fallback: preset.hours_reserve ?? 0 })}
                ${this._field(id, ['hours_per_month'], 'Hours per month', { number: true, fallback: preset.hours_per_month ?? 730.5 })}
              </div><p class="hint">Months are an estimate. The IQ reserve is configurable and does not establish a confirmed expiry date.</p>` : ''}
            ${this._field(id, ['attribute'], 'Numeric attribute')}
            <p class="hint">Leave the attribute blank to read the sensor state. A requested attribute never falls back to the state.</p>
            ${this._optionalGroup(id, 'availability', 'Require an availability condition', html`
              ${this._helperPicker(id, ['availability', 'entity'], 'Availability entity')}
              ${this._field(id, ['availability', 'state'], 'Available state', { fallback: 'on' })}
              <p class="hint">Only a known matching state allows the reading to display.</p>`)}
            ${this._optionalGroup(id, 'freshness', 'Check sample age', html`
              ${this._helperPicker(id, ['freshness', 'entity'], 'Sample timestamp entity (optional)')}
              ${this._field(id, ['freshness', 'attribute'], 'Sample timestamp attribute')}
              ${this._field(id, ['freshness', 'max_age'], 'Maximum sample age (minutes)', { number: true, factor: 60 })}
              <p class="hint">Use a true sample timestamp with a timezone. An attribute uses the reading entity unless another entity is selected. No age limit or sample time is inferred.</p>`)}
            ${this._select(id, ['tap_action', 'action'], 'Reading action', [['', 'Default (no action)'], ['none', 'No action'], ['more-info', 'Open HA history and details']])}
            ${sensor.tap_action?.action === 'more-info' ? this._helperPicker(id, ['tap_action', 'entity'], 'History entity (optional)') : ''}
          ` : html`<p class="hint">Select an entity to configure this reading.</p>`}
        </div>
      </details>
    `;
  }

  _value(id, path) {
    const sensor = option(this._config.sensors, id);
    return path.length === 1 ? option(sensor, path[0]) : option(option(sensor, path[0]), path[1]);
  }

  _field(id, path, label, settings = {}) {
    const fieldId = `sensor-${encodeURIComponent(id)}-${path.join('-')}`;
    const raw = this._value(id, path);
    const value = settings.factor && typeof raw === 'number' ? raw / settings.factor
      : raw === undefined && settings.keepEmpty ? settings.fallback : raw;
    const errorPath = `sensors.${id}.${path.join('.')}`;
    const invalid = !!this._error && (this._error.startsWith(errorPath + ' ')
      || (['min', 'max'].includes(path[0]) && this._error.startsWith(`sensors.${id} requires min`)));
    return html`<div class="field">
      <label for=${fieldId}>${label}</label>
      <input type="text" id=${fieldId} inputmode=${settings.number ? 'decimal' : 'text'}
        aria-invalid=${String(invalid)} aria-describedby=${invalid ? `${fieldId}-error` : ''}
        .value=${value === undefined ? '' : String(value)} placeholder=${settings.fallback === undefined ? '' : String(settings.fallback)}
        @change=${event => {
          const text = event.target.value;
          const remove = text === '' && !settings.keepEmpty;
          let parsed = settings.number ? finiteNumber(text) ?? text : text;
          if (settings.factor && typeof parsed === 'number') parsed *= settings.factor;
          this._optionChanged(id, path, parsed, remove);
        }}>
      ${invalid ? html`<span class="field-error" id=${`${fieldId}-error`}>${this._error}</span>` : ''}
    </div>`;
  }

  _select(id, path, label, choices) {
    const fieldId = `sensor-${encodeURIComponent(id)}-${path.join('-')}`;
    const raw = this._value(id, path);
    const value = raw === null && path[0] === 'display_format' ? 'numeric' : raw ?? '';
    return html`<div class="field"><label for=${fieldId}>${label}</label>
      <select id=${fieldId} .value=${value} @change=${event => {
        if (path[0] === 'tap_action') this._actionChanged(id, event.target.value);
        else this._optionChanged(id, path, event.target.value, event.target.value === '');
      }}>${choices.map(([key, name]) => html`<option value=${key} ?selected=${value === key}>${name}</option>`)}</select></div>`;
  }

  _helperPicker(id, path, label) {
    return html`<div class="field"><label>${label}</label>
      <ha-entity-picker aria-label=${label} .hass=${this.hass} .value=${this._value(id, path) || ''}
        allow-custom-entity @value-changed=${event => this._optionChanged(id, path, event.detail.value, !event.detail.value)}>
      </ha-entity-picker></div>`;
  }

  _optionalGroup(id, key, label, content) {
    const enabled = own(this._config.sensors[id], key);
    return html`<label class="check"><input type="checkbox" .checked=${enabled}
      @change=${event => this._toggleOption(id, key, event.target.checked)}>${label}</label>
      ${enabled ? content : ''}`;
  }

  _controlPicker(id, label, domain) {
    const entity = this._config.controls?.[id]?.entity || '';
    return html`<div class="field"><label>${label}</label>
      <ha-entity-picker data-primary aria-label=${label} .hass=${this.hass} .value=${entity}
        .includeDomains=${[domain]} .includeEntities=${editorEntities(this._config, this.hass, [domain], entity)}
        allow-custom-entity @value-changed=${event => this._controlChanged(id, event)}>
      </ha-entity-picker></div>`;
  }

  _titleChanged(event) { this._updateConfig({ title: event.target.value }); }
  _themeChanged(event) { this._updateConfig({ theme: event.target.value }); }
  _deviceChanged(event) {
    const next = { ...this._config };
    if (event.target.value) next.device_id = event.target.value; else delete next.device_id;
    this._publish(next);
  }
  _optionChanged(id, path, value, remove = false) {
    this._publish(patchSensorOption(this._config, id, path, value, remove));
  }
  _toggleOption(id, key, enabled) {
    const cacheKey = JSON.stringify([id, key]);
    if (!enabled) this._removedOptions.set(cacheKey, this._config.sensors[id][key]);
    this._optionChanged(id, [key], this._removedOptions.get(cacheKey) || {}, !enabled);
  }
  _linearChanged(id, enabled) {
    const key = JSON.stringify([id, 'zones']);
    if (enabled) {
      this._removedOptions.set(key, this._config.sensors[id].zones);
      this._optionChanged(id, ['zones'], null);
    } else {
      const prior = this._removedOptions.get(key);
      this._optionChanged(id, ['zones'], prior, prior === undefined);
    }
  }
  _actionChanged(id, action) {
    const key = JSON.stringify([id, 'tap_action']);
    if (!action) {
      this._removedOptions.set(key, this._config.sensors[id].tap_action);
      this._optionChanged(id, ['tap_action'], undefined, true);
    } else {
      this._optionChanged(id, ['tap_action'], { ...(this._config.sensors[id].tap_action || this._removedOptions.get(key)), action });
    }
  }
  _sensorChanged(id, event) {
    const entity = event.detail.value;
    let sensors = { ...this._config.sensors };
    if (entity) {
      sensors = { ...sensors, [id]: { ...(option(sensors, id) || this._removedSensors.get(id) || {}), entity } };
      this._removedSensors.delete(id);
    } else {
      if (own(sensors, id)) this._removedSensors.set(id, sensors[id]);
      delete sensors[id];
    }
    this._updateConfig({ sensors });
  }
  _controlChanged(id, event) {
    const entity = event.detail.value;
    const controls = { ...this._config.controls };
    if (entity) {
      controls[id] = { ...(controls[id] || this._removedControls.get(id) || {}), entity };
      this._removedControls.delete(id);
    } else {
      if (controls[id]) this._removedControls.set(id, controls[id]);
      delete controls[id];
    }
    this._updateConfig({ controls });
  }
  _updateConfig(update) { this._publish({ ...this._config, ...update }); }
  _publish(config) {
    this._config = config;
    this._error = this._validate(config);
    this._pending = !!this._error;
    if (this._pending) return;
    this._acceptedConfig = config;
    this._acceptedKey = JSON.stringify(config);
    fireEvent(this, 'config-changed', { config });
  }
  _discardDraft() {
    this._config = this._acceptedConfig;
    this._pending = false;
    this._error = this._validate(this._config);
  }
}

customElements.define('spa-monitor-card-editor', SpaMonitorCardEditor);
