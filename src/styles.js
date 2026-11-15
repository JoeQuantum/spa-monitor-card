import { css } from 'lit-element';

export const styles = css`
  /* ===== Card Container (glassmorphism) ===== */
  :host {
    --_spa-card-bg: rgba(255, 255, 255, 0.72);
    --_spa-card-border: rgba(0, 0, 0, 0.12);
    --_spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.06);
    --_spa-card-radius: 16px;
    --_spa-card-blur: 40px;
    --_spa-card-padding: 16px;

    --_spa-header-color: rgba(0, 0, 0, 0.75);
    --_spa-label-color: rgba(0, 0, 0, 0.6);
    --_spa-value-color: rgba(0, 0, 0, 0.45);

    --_spa-bar-width: 44px;
    --_spa-bar-height: 130px;
    --_spa-bar-radius: 3px;
    --_spa-bar-border: rgba(0, 0, 0, 0.1);

    --_spa-color-danger: #dc2626;
    --_spa-color-caution: #ca8a04;
    --_spa-color-ideal: #16a34a;

    --_spa-control-bg: rgba(0, 0, 0, 0.035);
    --_spa-control-border: rgba(0, 0, 0, 0.08);
    --_spa-control-active-bg: rgba(0, 0, 0, 0.14);
    --_spa-control-active-border: rgba(0, 0, 0, 0.25);
    --_spa-text-primary: rgba(0, 0, 0, 0.8);
    --_spa-text-secondary: rgba(0, 0, 0, 0.5);
    --_spa-text-tertiary: rgba(0, 0, 0, 0.3);

    --_spa-divider-color: rgba(0, 0, 0, 0.06);
  }

  .card {
    background: var(--spa-card-bg, var(--_spa-card-bg));
    backdrop-filter: blur(var(--spa-card-blur, var(--_spa-card-blur)));
    -webkit-backdrop-filter: blur(var(--spa-card-blur, var(--_spa-card-blur)));
    border-radius: var(--spa-card-radius, var(--_spa-card-radius));
    border: 1px solid var(--spa-card-border, var(--_spa-card-border));
    padding: var(--spa-card-padding, var(--_spa-card-padding));
    box-shadow: var(--spa-card-shadow, var(--_spa-card-shadow));
  }

  /* ===== Header ===== */
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
  .header-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--spa-header-color, var(--_spa-header-color));
  }

  /* ===== Bar Gauges Row ===== */
  .gauges-row {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-left: 12px;
    margin-bottom: 16px;
  }

  .gauge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }
  .gauge-label, .gauge-value {
    max-width: 100%;
    overflow-wrap: anywhere;
    text-align: center;
  }
  .gauge-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-label-color, var(--_spa-label-color));
    letter-spacing: 0.01em;
  }
  .gauge-bar-container {
    position: relative;
    width: var(--spa-bar-width, var(--_spa-bar-width));
    height: var(--spa-bar-height, var(--_spa-bar-height));
  }
  .gauge-bar {
    width: 100%;
    height: 100%;
    border-radius: var(--spa-bar-radius, var(--_spa-bar-radius));
    box-shadow: inset 0 0 0 1.5px var(--spa-bar-border, var(--_spa-bar-border)), inset 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .gauge-bar.gradient-standard {
    background: linear-gradient(to top,
      var(--spa-color-danger, var(--_spa-color-danger)) 0%,
      var(--spa-color-danger, var(--_spa-color-danger)) 10%,
      var(--spa-color-caution, var(--_spa-color-caution)) 10%,
      var(--spa-color-caution, var(--_spa-color-caution)) 20%,
      var(--spa-color-ideal, var(--_spa-color-ideal)) 20%,
      var(--spa-color-ideal, var(--_spa-color-ideal)) 80%,
      var(--spa-color-caution, var(--_spa-color-caution)) 80%,
      var(--spa-color-caution, var(--_spa-color-caution)) 90%,
      var(--spa-color-danger, var(--_spa-color-danger)) 90%,
      var(--spa-color-danger, var(--_spa-color-danger)) 100%
    );
  }
  .gauge-bar.gradient-depletion {
    background: linear-gradient(to top,
      var(--spa-color-danger, var(--_spa-color-danger)) 0%,
      var(--spa-color-danger, var(--_spa-color-danger)) 10%,
      var(--spa-color-caution, var(--_spa-color-caution)) 10%,
      var(--spa-color-caution, var(--_spa-color-caution)) 20%,
      var(--spa-color-ideal, var(--_spa-color-ideal)) 20%,
      var(--spa-color-ideal, var(--_spa-color-ideal)) 100%
    );
  }
  .gauge-indicator {
    position: absolute;
    left: -8px;
    z-index: 2;
    line-height: 0;
    transform: translateY(50%);
  }
  .gauge-value {
    font-size: 12px;
    font-weight: 500;
    color: var(--spa-value-color, var(--_spa-value-color));
  }

  /* ===== Divider ===== */
  .divider {
    height: 1px;
    background: var(--spa-divider-color, var(--_spa-divider-color));
    margin: 4px 0 12px;
  }

  /* ===== Controls Row ===== */
  .controls-row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }
  .output-level-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .output-level-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-label-color, var(--_spa-label-color));
    margin: 4px 0 8px 10px;
  }
  .output-level {
    background: var(--spa-control-bg, var(--_spa-control-bg));
    border-radius: 12px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .stepper-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid var(--spa-control-border, var(--_spa-control-border));
    background: var(--spa-control-bg, var(--_spa-control-bg));
    color: var(--spa-text-secondary, var(--_spa-text-secondary));
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  .output-level-value {
    font-size: 22px;
    font-weight: 700;
    color: var(--spa-text-primary, var(--_spa-text-primary));
    min-width: 30px;
    text-align: center;
  }

  .boost-btn {
    appearance: none;
    box-sizing: content-box;
    font: inherit;
    color: inherit;
    width: 100px;
    background: var(--spa-control-bg, var(--_spa-control-bg));
    border-radius: 12px;
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    user-select: none;
  }
  .boost-btn.active {
    background: var(--spa-control-active-bg, var(--_spa-control-active-bg));
    border-color: var(--spa-control-active-border, var(--_spa-control-active-border));
  }
  .boost-icon {
    stroke: var(--spa-text-secondary, var(--_spa-text-secondary));
  }
  .boost-btn.active .boost-icon {
    stroke: var(--spa-text-primary, var(--_spa-text-primary));
  }
  .boost-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-text-secondary, var(--_spa-text-secondary));
  }
  .boost-btn.active .boost-label {
    color: var(--spa-text-primary, var(--_spa-text-primary));
  }
  .boost-state {
    font-size: 11px;
    font-weight: 500;
    color: var(--spa-text-tertiary, var(--_spa-text-tertiary));
    opacity: 0.8;
  }
  .boost-btn.active .boost-state {
    color: var(--spa-text-secondary, var(--_spa-text-secondary));
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
  .stepper-btn:focus-visible, .boost-btn:focus-visible, .gauge:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 3px;
  }
  .boost-btn:disabled { cursor: default; }

  /* ===== Unavailable state ===== */
  .gauge.unavailable {
    opacity: 0.4;
  }
  .output-level-wrapper.unavailable,
  .boost-btn.unavailable {
    opacity: 0.4;
    pointer-events: none;
  }
  .stepper-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  /* ===== Dark mode ===== */
  .card.dark {
    --_spa-card-bg: rgba(30, 30, 30, 0.72);
    --_spa-card-border: rgba(255, 255, 255, 0.08);
    --_spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
    --_spa-header-color: rgba(255, 255, 255, 0.75);
    --_spa-label-color: rgba(255, 255, 255, 0.6);
    --_spa-value-color: rgba(255, 255, 255, 0.45);
    --_spa-bar-border: rgba(255, 255, 255, 0.15);
    --_spa-control-bg: rgba(255, 255, 255, 0.06);
    --_spa-control-border: rgba(255, 255, 255, 0.1);
    --_spa-control-active-bg: rgba(255, 255, 255, 0.35);
    --_spa-control-active-border: rgba(255, 255, 255, 0.3);
    --_spa-text-primary: rgba(255, 255, 255, 0.9);
    --_spa-text-secondary: rgba(255, 255, 255, 0.6);
    --_spa-text-tertiary: rgba(255, 255, 255, 0.35);
    --_spa-divider-color: rgba(255, 255, 255, 0.08);
  }

  /* ===== Glass mode (visionOS glassmorphism) ===== */
  .card.glass {
    --_spa-card-bg: rgba(255, 255, 255, 0.08);
    --_spa-card-border: rgba(255, 255, 255, 0.12);
    --_spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
    --_spa-card-blur: 40px;
    --_spa-header-color: rgba(255, 255, 255, 0.85);
    --_spa-label-color: rgba(255, 255, 255, 0.7);
    --_spa-value-color: rgba(255, 255, 255, 0.55);
    --_spa-bar-border: rgba(255, 255, 255, 0.18);
    --_spa-control-bg: rgba(255, 255, 255, 0.08);
    --_spa-control-border: rgba(255, 255, 255, 0.12);
    --_spa-control-active-bg: rgba(255, 255, 255, 0.35);
    --_spa-control-active-border: rgba(255, 255, 255, 0.35);
    --_spa-text-primary: rgba(255, 255, 255, 0.9);
    --_spa-text-secondary: rgba(255, 255, 255, 0.65);
    --_spa-text-tertiary: rgba(255, 255, 255, 0.4);
    --_spa-divider-color: rgba(255, 255, 255, 0.08);
  }
`;
