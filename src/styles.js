import { css } from 'lit-element';

export const styles = css`
  /* ===== Card Container (glassmorphism) ===== */
  :host {
    --spa-card-bg: rgba(255, 255, 255, 0.72);
    --spa-card-border: rgba(0, 0, 0, 0.12);
    --spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.06);
    --spa-card-radius: 16px;
    --spa-card-blur: 40px;
    --spa-card-padding: 16px;

    --spa-header-color: rgba(0, 0, 0, 0.75);
    --spa-label-color: rgba(0, 0, 0, 0.6);
    --spa-value-color: rgba(0, 0, 0, 0.45);

    --spa-bar-width: 44px;
    --spa-bar-height: 130px;
    --spa-bar-radius: 3px;
    --spa-bar-border: rgba(0, 0, 0, 0.1);

    --spa-color-danger: #dc2626;
    --spa-color-caution: #ca8a04;
    --spa-color-ideal: #16a34a;

    --spa-control-bg: rgba(0, 0, 0, 0.035);
    --spa-control-border: rgba(0, 0, 0, 0.08);
    --spa-control-active-bg: rgba(0, 0, 0, 0.14);
    --spa-control-active-border: rgba(0, 0, 0, 0.25);
    --spa-text-primary: rgba(0, 0, 0, 0.8);
    --spa-text-secondary: rgba(0, 0, 0, 0.5);
    --spa-text-tertiary: rgba(0, 0, 0, 0.3);

    --spa-divider-color: rgba(0, 0, 0, 0.06);
  }

  .card {
    background: var(--spa-card-bg);
    backdrop-filter: blur(var(--spa-card-blur));
    -webkit-backdrop-filter: blur(var(--spa-card-blur));
    border-radius: var(--spa-card-radius);
    border: 1px solid var(--spa-card-border);
    padding: var(--spa-card-padding);
    box-shadow: var(--spa-card-shadow);
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
    color: var(--spa-header-color);
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
  }
  .gauge-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-label-color);
    letter-spacing: 0.01em;
  }
  .gauge-bar-container {
    position: relative;
    width: var(--spa-bar-width);
    height: var(--spa-bar-height);
  }
  .gauge-bar {
    width: 100%;
    height: 100%;
    border-radius: var(--spa-bar-radius);
    box-shadow: inset 0 0 0 1.5px var(--spa-bar-border), inset 0 1px 2px rgba(0, 0, 0, 0.08);
  }
  .gauge-bar.gradient-standard {
    background: linear-gradient(to top,
      var(--spa-color-danger) 0%,
      var(--spa-color-danger) 8%,
      var(--spa-color-caution) 10%,
      var(--spa-color-caution) 18%,
      var(--spa-color-ideal) 20%,
      var(--spa-color-ideal) 80%,
      var(--spa-color-caution) 82%,
      var(--spa-color-caution) 90%,
      var(--spa-color-danger) 92%,
      var(--spa-color-danger) 100%
    );
  }
  .gauge-bar.gradient-depletion {
    background: linear-gradient(to top,
      var(--spa-color-danger) 0%,
      var(--spa-color-danger) 8%,
      var(--spa-color-caution) 10%,
      var(--spa-color-caution) 18%,
      var(--spa-color-ideal) 20%,
      var(--spa-color-ideal) 100%
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
    color: var(--spa-value-color);
  }

  /* ===== Divider ===== */
  .divider {
    height: 1px;
    background: var(--spa-divider-color);
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
    color: var(--spa-label-color);
    margin: 4px 0 8px 10px;
  }
  .output-level {
    background: var(--spa-control-bg);
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
    border: 1px solid var(--spa-control-border);
    background: var(--spa-control-bg);
    color: var(--spa-text-secondary);
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
    color: var(--spa-text-primary);
    min-width: 30px;
    text-align: center;
  }

  .boost-btn {
    width: 100px;
    background: var(--spa-control-bg);
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
    background: var(--spa-control-active-bg);
    border-color: var(--spa-control-active-border);
  }
  .boost-icon {
    stroke: var(--spa-text-secondary);
  }
  .boost-btn.active .boost-icon {
    stroke: var(--spa-text-primary);
  }
  .boost-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--spa-text-secondary);
  }
  .boost-btn.active .boost-label {
    color: var(--spa-text-primary);
  }
  .boost-state {
    font-size: 11px;
    font-weight: 500;
    color: var(--spa-text-tertiary);
    opacity: 0.8;
  }
  .boost-btn.active .boost-state {
    color: var(--spa-text-secondary);
  }

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
    --spa-card-bg: rgba(30, 30, 30, 0.72);
    --spa-card-border: rgba(255, 255, 255, 0.08);
    --spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
    --spa-header-color: rgba(255, 255, 255, 0.75);
    --spa-label-color: rgba(255, 255, 255, 0.6);
    --spa-value-color: rgba(255, 255, 255, 0.45);
    --spa-bar-border: rgba(255, 255, 255, 0.15);
    --spa-control-bg: rgba(255, 255, 255, 0.06);
    --spa-control-border: rgba(255, 255, 255, 0.1);
    --spa-control-active-bg: rgba(255, 255, 255, 0.18);
    --spa-control-active-border: rgba(255, 255, 255, 0.3);
    --spa-text-primary: rgba(255, 255, 255, 0.9);
    --spa-text-secondary: rgba(255, 255, 255, 0.6);
    --spa-text-tertiary: rgba(255, 255, 255, 0.35);
    --spa-divider-color: rgba(255, 255, 255, 0.08);
  }

  /* ===== Glass mode (visionOS glassmorphism) ===== */
  .card.glass {
    --spa-card-bg: rgba(255, 255, 255, 0.08);
    --spa-card-border: rgba(255, 255, 255, 0.12);
    --spa-card-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
    --spa-card-blur: 40px;
    --spa-header-color: rgba(255, 255, 255, 0.85);
    --spa-label-color: rgba(255, 255, 255, 0.7);
    --spa-value-color: rgba(255, 255, 255, 0.55);
    --spa-bar-border: rgba(255, 255, 255, 0.18);
    --spa-control-bg: rgba(255, 255, 255, 0.08);
    --spa-control-border: rgba(255, 255, 255, 0.12);
    --spa-control-active-bg: rgba(255, 255, 255, 0.2);
    --spa-control-active-border: rgba(255, 255, 255, 0.35);
    --spa-text-primary: rgba(255, 255, 255, 0.9);
    --spa-text-secondary: rgba(255, 255, 255, 0.65);
    --spa-text-tertiary: rgba(255, 255, 255, 0.4);
    --spa-divider-color: rgba(255, 255, 255, 0.08);
  }
`;
