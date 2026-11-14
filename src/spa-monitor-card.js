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
import { finiteNumber, numberState, nextNumberStep } from './numbers.js';

const CARD_VERSION = '__CARD_VERSION__'; // Filled from package.json by Rollup.
const VALID_THEMES = ['auto', 'light', 'dark', 'glass'];
const OUTPUT_REPORT_TIMEOUT = 15000;

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
    this._pendingOutput = null;
    this._inflightOutput = null;
    this._outputTimer = null;
    this._outputError = '';
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

  get hass() { return this._hass; }

  set hass(value) {
    const previous = this._hass;
    this._hass = value;
    const pending = this._pendingOutput;
    if (pending) {
      const state = value?.states?.[pending.entity];
      const current = numberState(state);
      if (!current || ['min', 'max', 'step'].some(key => current[key] !== pending[key])) {
        this._clearOutputIntent();
      } else if (state !== previous?.states?.[pending.entity]
          && current.value === pending.value && pending.sentValue === pending.value) {
        // Service completion is not acknowledgement. Wait for a matching report.
        this._clearOutputIntent();
      }
    }
    this.requestUpdate('hass', previous);
  }

  disconnectedCallback() {
    this._clearOutputIntent();
    super.disconnectedCallback();
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
      const sensor = resolvedSensors[sensorId];
      if (sensor.display_format === 'hours_to_months') {
        const divisor = sensor.hours_per_month === undefined ? 730.5 : sensor.hours_per_month;
        const reserve = sensor.hours_reserve === undefined ? 0 : sensor.hours_reserve;
        if (typeof divisor !== 'number' || !Number.isFinite(divisor) || divisor <= 0) {
          throw new Error(`sensors.${sensorId}.hours_per_month must be a finite number greater than zero.`);
        }
        if (typeof reserve !== 'number' || !Number.isFinite(reserve) || reserve < 0) {
          throw new Error(`sensors.${sensorId}.hours_reserve must be a finite non-negative number.`);
        }
        sensor.hours_per_month = divisor;
        sensor.hours_reserve = reserve;
      }
    }

    if (config.controls?.output_level?.entity !== this._config?.controls?.output_level?.entity) {
      this._clearOutputIntent();
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

    const theme = this._config.theme;
    const isDark = theme === 'dark'
      || (theme === 'auto' && this.hass.themes?.darkMode);
    const isGlass = theme === 'glass';

    return html`
      <div class="card ${isDark ? 'dark' : ''} ${isGlass ? 'glass' : ''}">
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
    const value = finiteNumber(stateObj?.state);
    const isUnavailable = value === null;

    const gradientClass = `gradient-${sensor.gradient || 'standard'}`;
    const position = isUnavailable ? 0 : getIndicatorPosition(value, sensor);

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
    const current = numberState(stateObj);
    const isUnavailable = current === null;
    const pending = this._pendingOutput;
    const desired = pending?.value ?? current?.value;
    const decrease = current && nextNumberStep(desired, -1, current);
    const increase = current && nextNumberStep(desired, 1, current);
    const status = pending
      ? `Requested ${pending.value}; waiting for the device report.`
      : this._outputError;

    return html`
      <div class="output-level-wrapper ${isUnavailable ? 'unavailable' : ''}">
        <span class="output-level-label">Output Level</span>
        <div class="output-level" aria-busy=${pending ? 'true' : 'false'} title=${status}>
          <button class="stepper-btn"
            aria-label="Decrease output level"
            ?disabled=${decrease === null}
            @click=${() => this._adjustOutputLevel(-1)}>
            −
          </button>
          <span class="output-level-value">${isUnavailable ? '---' : current.value}</span>
          <button class="stepper-btn"
            aria-label="Increase output level"
            ?disabled=${increase === null}
            @click=${() => this._adjustOutputLevel(1)}>
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
    if (!Number.isFinite(value)) return '---';
    if (sensor.display_format === 'hours_to_months') {
      const reserve = sensor.hours_reserve ?? 0;
      const hoursPerMonth = sensor.hours_per_month ?? 730.5;
      const months = Math.max(0, (value - reserve) / hoursPerMonth);
      if (!Number.isFinite(months)) return '---';
      return `${Math.round(months)} mo`;
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

  _clearOutputIntent(error = '') {
    clearTimeout(this._outputTimer);
    this._outputTimer = null;
    this._pendingOutput = null;
    // A late service completion must not dispatch a target from an old session.
    this._inflightOutput = null;
    this._outputError = error;
    this.requestUpdate();
  }

  _adjustOutputLevel(direction) {
    const entity = this._config.controls.output_level.entity;
    const current = numberState(this.hass.states[entity]);
    if (!current || ![-1, 1].includes(direction)) return;
    const desired = this._pendingOutput?.value ?? current.value;
    const next = nextNumberStep(desired, direction, current);
    if (next !== null) this._setOutputLevel(next);
  }

  _setOutputLevel(value) {
    const entity = this._config.controls.output_level.entity;
    const current = numberState(this.hass.states[entity]);
    value = finiteNumber(value);
    if (!current || value === null || value < current.min || value > current.max) return;
    const ticks = (value - current.min) / current.step;
    if (Math.abs(ticks - Math.round(ticks)) > Number.EPSILON * Math.max(1, Math.abs(ticks)) * 16) return;
    if (value === (this._pendingOutput?.value ?? current.value)) return;
    this._pendingOutput = { ...current, entity, value, sentValue: this._inflightOutput?.value };
    this._outputError = '';
    clearTimeout(this._outputTimer);
    this._outputTimer = setTimeout(() => {
      this._clearOutputIntent('Output request timed out; showing the reported value.');
    }, OUTPUT_REPORT_TIMEOUT);
    this.requestUpdate();
    this._sendOutputIntent();
  }

  async _sendOutputIntent() {
    if (this._inflightOutput || !this._pendingOutput) return;
    const { entity, value } = this._pendingOutput;
    const request = { entity, value };
    this._inflightOutput = request;
    this._pendingOutput.sentValue = value;
    try {
      await this.hass.callService('number', 'set_value', { entity_id: entity, value });
    } catch {
      if (this._inflightOutput === request) {
        this._clearOutputIntent('Output request failed; showing the reported value.');
      }
      return;
    }
    if (this._inflightOutput !== request) return;
    this._inflightOutput = null;
    // Serialize service calls; clicks made during a call coalesce to the latest
    // desired value. Reports, not these promises, control the displayed value.
    if (this._pendingOutput && this._pendingOutput.value !== value) this._sendOutputIntent();
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
