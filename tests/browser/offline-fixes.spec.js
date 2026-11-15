import { test, expect } from '@playwright/test';
import { fixture, mount, updateState, assertHealthy } from './helpers.js';

test.afterEach(({ page }) => assertHealthy(page));

test('C02 rejects malformed nested configuration with field paths before rendering', async ({ page }) => {
  await mount(page);
  const attempts = await page.evaluate(() => [
    [null, 'config'],
    [{ sensors: [] }, 'sensors'],
    [{ sensors: { ph: null } }, 'sensors.ph'],
    [{ sensors: { ph: { entity: 'number.ph' } } }, 'sensors.ph.entity'],
    [{ sensors: { ph: { entity: 'sensor.ph', decimals: 101 } } }, 'sensors.ph.decimals'],
    [{ sensors: { ph: { entity: 'sensor.ph', min: 9, max: 6 } } }, 'sensors.ph'],
    [{ sensors: { ph: { entity: 'sensor.ph', gradient: 'rainbow' } } }, 'sensors.ph.gradient'],
    [{ sensors: { ph: { entity: 'sensor.ph', display_format: 'date' } } }, 'sensors.ph.display_format'],
    [{ sensors: { custom: { entity: 'sensor.custom' } } }, 'sensors.custom'],
    [{ ...card.getConfig(), controls: { boost: { entity: 'light.boost' } } }, 'controls.boost.entity'],
    [{ ...card.getConfig(), controls: { output_level: false } }, 'controls.output_level'],
  ].map(([config, path]) => {
    try { document.createElement('spa-monitor-card').setConfig(config); return { path, error: null }; }
    catch (e) { return { path, error: e.message }; }
  }));
  for (const { path, error } of attempts) {
    expect(error, path).not.toBeNull();
    expect(error, path).toContain(path);
    expect(error).not.toMatch(/Cannot read|toFixed|not iterable/);
  }
});

test('C03 range overrides change endpoints without moving preset thresholds', async ({ page }) => {
  await mount(page, { config: { sensors: { chlorine: { entity: 'sensor.chlorine', max: 20 } } }, states: { ...fixture.states, 'sensor.chlorine': { state: '12' } } });
  const position = await page.locator('.gauge-indicator').evaluate(e => parseFloat(e.style.bottom));
  expect(position).toBeCloseTo(93.3333333);
  await updateState(page, 'sensor.chlorine', '5');
  expect(await page.locator('.gauge-indicator').evaluate(e => e.style.bottom)).toBe('80%');
});

test('C02 missing startup entities render unavailable and invalid config leaves the last valid config intact', async ({ page }) => {
  await mount(page, { states: {} });
  await expect(page.locator('.gauge.unavailable')).toHaveCount(4);
  await expect(page.locator('.boost-btn')).toHaveClass(/unavailable/);
  const preserved = await page.evaluate(() => {
    const prior = card.getConfig();
    try { card.setConfig({ sensors: { ph: { entity: 'sensor.ph', decimals: -1 } } }); } catch {}
    return card.getConfig() === prior;
  });
  expect(preserved).toBe(true);
});

test('C03 below and above scale readings have distinct textual equivalents', async ({ page }) => {
  await mount(page);
  await updateState(page, 'sensor.chlorine', '-1');
  await expect(page.locator('.gauge').first()).toHaveAttribute('aria-label', /Below displayed range/);
  await updateState(page, 'sensor.chlorine', '11');
  await expect(page.locator('.gauge').first()).toHaveAttribute('aria-label', /Above displayed range/);
  await expect(page.locator('.gauge').last()).toHaveAttribute('aria-label', /10000 raw hours; displayed months are an estimate/);
});
