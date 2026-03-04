import { LitElement, html, css } from 'lit-element';
import { SENSOR_PRESETS } from './sensors.js';

const SENSOR_IDS = Object.keys(SENSOR_PRESETS);

function fireEvent(node, type, detail) {
  const event = new CustomEvent(type, {
    bubbles: true,
    composed: true,
    detail,
  });
  node.dispatchEvent(event);
}

class SpaMonitorCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  static get styles() {
    return css`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }
      .section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .section-title {
        font-weight: 600;
        font-size: 14px;
        color: var(--primary-text-color);
        border-bottom: 1px solid var(--divider-color);
        padding-bottom: 4px;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .field label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      input[type="text"], select {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 14px;
      }
      ha-entity-picker {
        display: block;
      }
    `;
  }

  /**
   * Called by HA when editor config is set.
   * @param {Object} config - Raw card config.
   */
  setConfig(config) {
    this._config = { ...config };
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const theme = this._config.theme || 'auto';

    return html`
      <div class="editor">
        <div class="section">
          <div class="section-title">General</div>
          <div class="field">
            <label>Title</label>
            <input type="text"
              .value=${this._config.title || ''}
              @input=${this._titleChanged}>
          </div>
          <div class="field">
            <label>Theme</label>
            <select @change=${this._themeChanged}>
              <option value="auto" ?selected=${theme === 'auto'}>Auto</option>
              <option value="light" ?selected=${theme === 'light'}>Light</option>
              <option value="dark" ?selected=${theme === 'dark'}>Dark</option>
            </select>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Sensors</div>
          ${SENSOR_IDS.map((id) => this._renderSensorField(id))}
        </div>

        <div class="section">
          <div class="section-title">Controls</div>
          <div class="field">
            <label>Output Level Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._config.controls?.output_level?.entity || ''}
              .includeDomains=${['number']}
              allow-custom-entity
              @value-changed=${(e) => this._controlChanged('output_level', e)}>
            </ha-entity-picker>
          </div>
          <div class="field">
            <label>Boost Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._config.controls?.boost?.entity || ''}
              .includeDomains=${['switch']}
              allow-custom-entity
              @value-changed=${(e) => this._controlChanged('boost', e)}>
            </ha-entity-picker>
          </div>
        </div>
      </div>
    `;
  }

  _renderSensorField(id) {
    const preset = SENSOR_PRESETS[id];
    const entity = this._config.sensors?.[id]?.entity || '';

    return html`
      <div class="field">
        <label>${preset.name} Entity</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${entity}
          .includeDomains=${['sensor']}
          allow-custom-entity
          @value-changed=${(e) => this._sensorChanged(id, e)}>
        </ha-entity-picker>
      </div>
    `;
  }

  _titleChanged(e) {
    this._updateConfig({ title: e.target.value });
  }

  _themeChanged(e) {
    this._updateConfig({ theme: e.target.value });
  }

  _sensorChanged(id, e) {
    const entity = e.detail.value;
    const sensors = { ...this._config.sensors };

    if (entity) {
      sensors[id] = { ...(sensors[id] || {}), entity };
    } else {
      delete sensors[id];
    }

    this._updateConfig({ sensors });
  }

  _controlChanged(controlId, e) {
    const entity = e.detail.value;
    const controls = { ...this._config.controls };

    if (entity) {
      controls[controlId] = { ...(controls[controlId] || {}), entity };
    } else {
      delete controls[controlId];
    }

    this._updateConfig({ controls });
  }

  _updateConfig(update) {
    this._config = { ...this._config, ...update };
    fireEvent(this, 'config-changed', { config: this._config });
  }
}

customElements.define('spa-monitor-card-editor', SpaMonitorCardEditor);
