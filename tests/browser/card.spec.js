import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fixture, mount, updateState, assertHealthy } from './helpers.js';

const { version } = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8'));

test.afterEach(async ({ page }, info) => {
  if (info.expectedStatus === 'passed') assertHealthy(page);
});

test('released bundle registers the spa card and renders the four configured readings', async ({ page }) => {
  const consoleMessages = [];
  page.on('console', message => consoleMessages.push(message.text()));
  await mount(page);
  await expect(page.locator('.gauge-value')).toHaveText(['3.0 ppm', '7.5', '1750 ppm', '13 mo']);
  expect(await page.evaluate(() => window.customCards.filter(c => c.type === 'spa-monitor-card').length)).toBe(1);
  expect(consoleMessages.some(message => message.includes('SPA-MONITOR-CARD') && message.includes(`v${version} `))).toBe(true);
});

test('invalid basic configuration is rejected before rendering', async ({ page }) => {
  await mount(page);
  const errors = await page.evaluate(() => [{}, { sensors: {} }, { sensors: { ph: {} } }, { sensors: { ph: { entity: 'sensor.ph' } }, theme: 'invalid' }].map(config => {
    try { document.createElement('spa-monitor-card').setConfig(config); return null; }
    catch (error) { return error.message; }
  }));
  expect(errors.every(Boolean)).toBe(true);
});

test('unknown, unavailable and missing sensors hide the marker and recover', async ({ page }) => {
  await mount(page);
  for (const state of ['unknown', 'unavailable', undefined]) {
    await updateState(page, 'sensor.chlorine', state);
    await expect(page.locator('.gauge').first()).toHaveClass(/unavailable/);
    await expect(page.locator('.gauge').first().locator('.gauge-indicator')).toHaveCount(0);
  }
  await updateState(page, 'sensor.chlorine', '0');
  await expect(page.locator('.gauge-value').first()).toHaveText('0.0 ppm');
  await expect(page.locator('.gauge').first().locator('.gauge-indicator')).toHaveCount(1);
});

test('IQ life formatting applies the configured reserve and conversion', async ({ page }) => {
  await mount(page);
  const result = await page.evaluate(() => {
    const s = card.getConfig().sensors.iq_sensor;
    return [card._formatValue(508, s), card._formatValue(1969, s), card._formatValue(10000, s), card._formatValue(720, { ...s, hours_reserve: 0, hours_per_month: 720 })];
  });
  expect(result).toEqual(['0 mo', '2 mo', '13 mo', '1 mo']);
});

test('controls call the configured services and disable when unavailable', async ({ page }) => {
  await mount(page);
  await page.locator('.stepper-btn').last().click();
  await page.locator('.boost-btn').click();
  expect(await page.evaluate(() => calls)).toEqual([
    ['number', 'set_value', { entity_id: 'number.output', value: 4 }],
    ['switch', 'toggle', { entity_id: 'switch.boost' }],
  ]);
  await updateState(page, 'number.output', 'unavailable');
  await expect(page.locator('.stepper-btn').first()).toBeDisabled();
  await expect(page.locator('.stepper-btn').last()).toBeDisabled();
});

test('optional controls stay absent and editor changes preserve YAML overrides', async ({ page }) => {
  const config = { ...fixture.config, controls: {}, sensors: { ph: { entity: 'sensor.ph', min: 6, custom_option: 'keep' } } };
  await mount(page, { config });
  await expect(page.locator('.controls-row')).toHaveCount(0);
  const changed = await page.evaluate(async config => {
    const editor = document.createElement('spa-monitor-card-editor');
    editor.setConfig(config); editor.hass = card.hass;
    document.querySelector('#mount').appendChild(editor); await editor.updateComplete;
    let changed; editor.addEventListener('config-changed', e => changed = e.detail.config);
    editor._sensorChanged('ph', { detail: { value: 'sensor.new_ph' } });
    return changed;
  }, config);
  expect(changed.sensors.ph).toEqual({ entity: 'sensor.new_ph', min: 6, custom_option: 'keep' });
});

test('themes, multiple cards and supported widths retain the current presentation', async ({ page }) => {
  await mount(page);
  for (const theme of ['light', 'dark', 'glass']) {
    await page.evaluate(async theme => { card.setConfig({ ...card.getConfig(), theme }); await card.updateComplete; }, theme);
    await expect(page.locator('.gauge')).toHaveCount(4);
    if (theme !== 'light') await expect(page.locator('.card')).toHaveClass(new RegExp(theme));
  }
  for (const width of [380, 320, 240]) {
    const fits = await page.evaluate(width => {
      document.querySelector('#mount').style.width = `${width}px`;
      const root = card.shadowRoot.querySelector('.card'); return root.scrollWidth <= root.clientWidth;
    }, width);
    expect(fits).toBe(true);
  }
  const ids = await page.evaluate(async () => {
    const other = document.createElement('spa-monitor-card'); other.setConfig(card.getConfig()); other.hass = card.hass;
    document.querySelector('#mount').appendChild(other); await other.updateComplete;
    return [card, other].flatMap(c => [...c.shadowRoot.querySelectorAll('linearGradient')].map(g => g.id));
  });
  expect(new Set(ids).size).toBe(ids.length);
});

// Reproductions only: these defects are fixed by the next two PRs.
for (const state of ['error', '', 'NaN', 'Infinity', '7.5oops']) {
  test(`C01 rejects invalid reading ${JSON.stringify(state)}`, async ({ page }) => {
    await mount(page); await updateState(page, 'sensor.chlorine', state);
    const unavailable = /unavailable/.test(await page.locator('.gauge').first().getAttribute('class'));
    test.fail(true, 'C01: strict finite parsing belongs to the numeric PR');
    expect(unavailable).toBe(true);
  });
}
test('C01 invalid number never sends a service command', async ({ page }) => {
  await mount(page); await updateState(page, 'number.output', 'error');
  const disabled = await page.locator('.stepper-btn').last().isDisabled();
  test.fail(true, 'C01: numeric control guards belong to the numeric PR');
  expect(disabled).toBe(true);
});
test('C02 rejects a zero hours-per-month divisor', async ({ page }) => {
  await mount(page);
  const rejected = await page.evaluate(() => {
    try { card.setConfig({ sensors: { iq_sensor: { entity: 'sensor.iq', hours_per_month: 0 } } }); return false; }
    catch { return true; }
  });
  assertHealthy(page);
  test.fail(true, 'C02: conversion validation belongs to the numeric PR');
  expect(rejected).toBe(true);
});
test('C04 output control honors an entity step of two', async ({ page }) => {
  await mount(page, { states: { ...fixture.states, 'number.output': { state: '4', attributes: { min: 0, max: 10, step: 2 } } } });
  await page.locator('.stepper-btn').last().click();
  const requestedValue = await page.evaluate(() => calls[0][2].value);
  assertHealthy(page);
  test.fail(true, 'C04: step handling belongs to the controls PR');
  expect(requestedValue).toBe(6);
});

test('C04 rapid increments preserve intent', async ({ page }) => {
  await mount(page);
  for (let i = 0; i < 3; i++) await page.locator('.stepper-btn').last().click();
  const values = await page.evaluate(() => calls.map(c => c[2].value));
  assertHealthy(page);
  test.fail(true, 'C04: desired-state tracking belongs to the controls PR');
  expect(values).toEqual([4, 5, 6]);
});
