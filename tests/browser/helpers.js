import { readFile } from 'node:fs/promises';
import { expect } from '@playwright/test';

const browserErrors = new WeakMap();
export function assertHealthy(page) {
  expect(browserErrors.get(page), 'the distributed bundle must not raise browser errors').toEqual([]);
}

export const fixture = {
  config: {
    type: 'custom:spa-monitor-card', title: 'Water Quality', theme: 'auto',
    sensors: {
      chlorine: { entity: 'sensor.chlorine' }, ph: { entity: 'sensor.ph' },
      salt: { entity: 'sensor.salt' }, iq_sensor: { entity: 'sensor.iq' },
    },
    controls: { output_level: { entity: 'number.output' }, boost: { entity: 'switch.boost' } },
  },
  states: {
    'sensor.chlorine': { state: '3', attributes: {} },
    'sensor.ph': { state: '7.5', attributes: {} },
    'sensor.salt': { state: '1750', attributes: {} },
    'sensor.iq': { state: '10000', attributes: {} },
    'number.output': { state: '3', attributes: { min: 0, max: 10, step: 1 } },
    'switch.boost': { state: 'off', attributes: {} },
  },
};

export async function mount(page, { config = fixture.config, states = fixture.states } = {}) {
  const errors = [];
  browserErrors.set(page, errors);
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => route.abort());
  await page.setContent('<div id="mount" style="width:380px"></div>');
  const bundle = await readFile(new URL('../../dist/spa-monitor-card.js', import.meta.url), 'utf8');
  await page.addScriptTag({ type: 'module', content: bundle });
  await page.waitForFunction(() => customElements.get('spa-monitor-card'));
  await page.evaluate(async ({ config, states }) => {
    window.calls = [];
    const card = document.createElement('spa-monitor-card');
    card.setConfig(config);
    card.hass = { states, themes: { darkMode: false }, callService: (...args) => {
      window.calls.push(args); return Promise.resolve();
    } };
    document.querySelector('#mount').appendChild(card);
    window.card = card;
    await card.updateComplete;
  }, { config, states });
  assertHealthy(page);
}

export async function updateState(page, entity, state) {
  await page.evaluate(async ({ entity, state }) => {
    card.hass = { ...card.hass, states: { ...card.hass.states, [entity]: { ...card.hass.states[entity], state } } };
    await card.updateComplete;
  }, { entity, state });
  assertHealthy(page);
}
