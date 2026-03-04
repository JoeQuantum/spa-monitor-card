/**
 * spa-monitor-card
 *
 * Home Assistant Lovelace card for HotSpring/ESP-IQ2020 water care monitoring.
 * Fork of pool-monitor-card with vertical bar gauges, triangle indicators,
 * and integrated salt system controls.
 *
 * @see IMPLEMENTATION_PLAN.md for full design spec
 * @see reference/water-quality-mockup.jsx for pixel reference
 */

import { LitElement, html } from 'lit-element';
import { styles } from './styles.js';
import {
  SENSOR_PRESETS,
  getIndicatorPosition,
} from './sensors.js';
import './spa-monitor-card-editor.js';

const CARD_VERSION = '0.1.0';
const VALID_THEMES = ['auto', 'light', 'dark'];

let cardInstanceId = 0;

console.info(
  `%c SPA-MONITOR-CARD %c v${CARD_VERSION} `,
  'color: white; background: #16a34a; font-weight: bold;',
  'color: #16a34a; background: white; font-weight: bold;'
);

class SpaMonitorCard extends LitElement {
  constructor() {
    super();
    this._instanceId = cardInstanceId++;
  }

  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  static get styles() {
    return styles;
  }

  /** @returns {HTMLElement} The config editor element for the HA UI. */
  static getConfigElement() {
    return document.createElement('spa-monitor-card-editor');
  }

  /**
   * Called by HA when card config is set or updated.
   * Validates config, merges sensor presets, and stores resolved config.
   * @param {Object} config - Raw YAML config from HA.
   */
  setConfig(config) {
    if (!config.sensors || Object.keys(config.sensors).length === 0) {
      throw new Error('Please define at least one sensor.');
    }

    if (config.theme && !VALID_THEMES.includes(config.theme)) {
      throw new Error(`Invalid theme "${config.theme}". Must be: ${VALID_THEMES.join(', ')}`);
    }

    const resolvedSensors = {};
    for (const [sensorId, sensorConfig] of Object.entries(config.sensors)) {
      const preset = SENSOR_PRESETS[sensorId] || {};
      resolvedSensors[sensorId] = {
        ...preset,
        ...sensorConfig,
        gradient: sensorConfig.gradient || preset.gradient || 'standard',
      };
      if (!resolvedSensors[sensorId].entity) {
        throw new Error(`Sensor "${sensorId}" requires an entity.`);
      }
    }

    this._config = {
      ...config,
      title: config.title || '',
      theme: config.theme || 'auto',
      sensors: resolvedSensors,
      controls: config.controls || {},
    };
  }

  /** @returns {Object} The current resolved config. */
  getConfig() {
    return this._config;
  }

  /** @returns {number} Approximate card height in rows for HA layout. */
  getCardSize() {
    return 4;
  }

  // ==========================================
  // RENDERING
  // ==========================================

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const isDark = this._config.theme === 'dark'
      || (this._config.theme === 'auto' && this.hass.themes?.darkMode);

    return html`
      <div class="card ${isDark ? 'dark' : ''}">
        ${this._config.title ? this._renderHeader() : ''}
        ${this._renderGauges()}
        ${this._hasControls() ? html`
          <div class="divider"></div>
          ${this._renderControls()}
        ` : ''}
      </div>
    `;
  }

  _renderHeader() {
    return html`
      <div class="header">
        <span class="header-title">${this._config.title}</span>
      </div>
    `;
  }

  _renderGauges() {
    return html`
      <div class="gauges-row">
        ${Object.entries(this._config.sensors).map(
          ([id, sensor]) => this._renderSingleGauge(id, sensor)
        )}
      </div>
    `;
  }

  _renderSingleGauge(id, sensor) {
    const stateObj = this.hass.states[sensor.entity];
    const isUnavailable = this._isUnavailable(stateObj);
    const value = isUnavailable ? null : parseFloat(stateObj.state);

    const gradientClass = `gradient-${sensor.gradient || 'standard'}`;
    const position = isUnavailable ? 0 : getIndicatorPosition(value, sensor.min, sensor.max);

    let displayValue = '---';
    if (!isUnavailable) {
      displayValue = this._formatValue(value, sensor);
    }

    return html`
      <div class="gauge ${isUnavailable ? 'unavailable' : ''}">
        <span class="gauge-label">${sensor.name}</span>
        <div class="gauge-bar-container">
          <div class="gauge-bar ${gradientClass}"></div>
          ${!isUnavailable ? html`
            <div class="gauge-indicator" style="bottom: ${position}%;">
              ${this._renderTriangle(id)}
            </div>
          ` : ''}
        </div>
        <span class="gauge-value">${displayValue}</span>
      </div>
    `;
  }

  _renderTriangle(id) {
    const gradId = `triGrad-${this._instanceId}-${id}`;
    return html`
      <svg width="14" height="18" viewBox="0 0 14 18"
        style="filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.25));">
        <defs>
          <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="40%" stop-color="#e8e8e8"/>
            <stop offset="100%" stop-color="#cccccc"/>
          </linearGradient>
        </defs>
        <polygon points="0,0 14,9 0,18" fill="url(#${gradId})"/>
        <line x1="0" y1="0.5" x2="13" y2="8.5"
          stroke="rgba(255,255,255,0.9)" stroke-width="1"/>
        <line x1="0" y1="17.5" x2="13" y2="9.5"
          stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>
      </svg>
    `;
  }

  _renderControls() {
    return html`
      <div class="controls-row">
        ${this._config.controls.output_level
          ? this._renderOutputLevel()
          : ''}
        ${this._config.controls.boost
          ? this._renderBoost()
          : ''}
      </div>
    `;
  }

  _renderOutputLevel() {
    const entity = this._config.controls.output_level.entity;
    const stateObj = this.hass.states[entity];
    const isUnavailable = this._isUnavailable(stateObj);
    const value = isUnavailable ? 0 : parseFloat(stateObj.state);
    const min = stateObj?.attributes?.min ?? 0;
    const max = stateObj?.attributes?.max ?? 10;

    return html`
      <div class="output-level-wrapper ${isUnavailable ? 'unavailable' : ''}">
        <span class="output-level-label">Output Level</span>
        <div class="output-level">
          <button class="stepper-btn"
            ?disabled=${isUnavailable}
            @click=${() => this._setOutputLevel(Math.max(min, value - 1))}>
            −
          </button>
          <span class="output-level-value">${isUnavailable ? '---' : value}</span>
          <button class="stepper-btn"
            ?disabled=${isUnavailable}
            @click=${() => this._setOutputLevel(Math.min(max, value + 1))}>
            +
          </button>
        </div>
      </div>
    `;
  }

  _renderBoost() {
    const entity = this._config.controls.boost.entity;
    const stateObj = this.hass.states[entity];
    const isUnavailable = this._isUnavailable(stateObj);
    const isOn = stateObj?.state === 'on';

    return html`
      <div class="boost-btn ${isOn ? 'active' : ''} ${isUnavailable ? 'unavailable' : ''}"
        @click=${() => !isUnavailable && this._toggleBoost()}>
        <svg class="boost-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
        <span class="boost-label">Boost</span>
        <span class="boost-state">${isUnavailable ? '---' : (isOn ? 'On' : 'Off')}</span>
      </div>
    `;
  }

  // ==========================================
  // HELPERS
  // ==========================================

  _isUnavailable(stateObj) {
    if (!stateObj) return true;
    const s = stateObj.state;
    return s === 'unavailable' || s === 'unknown' || s === undefined;
  }

  _formatValue(value, sensor) {
    if (isNaN(value)) return '---';
    if (sensor.display_format === 'hours_to_months') {
      return `${Math.round(value / 720)} mo`;
    }
    const decimals = sensor.decimals ?? 1;
    const formatted = decimals === 0
      ? Math.round(value).toString()
      : value.toFixed(decimals);
    return sensor.unit ? `${formatted} ${sensor.unit}` : formatted;
  }

  _hasControls() {
    return this._config.controls.output_level || this._config.controls.boost;
  }

  // ==========================================
  // SERVICE CALLS
  // ==========================================

  _setOutputLevel(value) {
    const entity = this._config.controls.output_level.entity;
    this.hass.callService('number', 'set_value', {
      entity_id: entity,
      value: value,
    });
  }

  _toggleBoost() {
    const entity = this._config.controls.boost.entity;
    this.hass.callService('switch', 'toggle', {
      entity_id: entity,
    });
  }
}

customElements.define('spa-monitor-card', SpaMonitorCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'spa-monitor-card',
  name: 'Spa Monitor Card',
  description: 'Water quality monitoring for HotSpring/ESP-IQ2020 salt systems',
});
