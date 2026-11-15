import { test, expect } from '@playwright/test';
import { fixture, mount, updateState, assertHealthy } from './helpers.js';
test.afterEach(({ page }) => assertHealthy(page));

test('C10 explicit attributes never fall back and unavailable sources hide cached readings', async ({ page }) => {
  const config = { sensors: { ph: { entity: 'sensor.ph', attribute: 'reading' } } };
  await mount(page, { config });
  await expect(page.locator('.gauge-value')).toHaveText('---');
  await expect(page.locator('.gauge-indicator')).toHaveCount(0);
  await page.evaluate(() => { card.hass = { ...card.hass, states: { 'sensor.ph': { state: '8', attributes: { reading: 0 } } } }; });
  await expect(page.locator('.gauge-value')).toHaveText('0.0');
  await updateState(page, 'sensor.ph', 'unavailable');
  await expect(page.locator('.gauge-value')).toHaveText('---');
});

test('C10 explicit availability does not mistake unknown for enabled', async ({ page }) => {
  const config = { sensors: { ph: { entity: 'sensor.ph', availability: { entity: 'binary_sensor.enabled' } } } };
  await mount(page, { config });
  await expect(page.locator('.gauge')).toHaveAttribute('aria-label', /Availability unknown/);
  await updateState(page, 'binary_sensor.enabled', 'off');
  await expect(page.locator('.gauge')).toHaveAttribute('aria-label', /condition not met/);
  await expect(page.locator('.gauge-indicator')).toHaveCount(0);
  await updateState(page, 'binary_sensor.enabled', 'on');
  await expect(page.locator('.gauge-value')).toHaveText('7.5');
  await updateState(page, 'binary_sensor.enabled', 'unknown');
  await expect(page.locator('.gauge-value')).toHaveText('---');
});

test('C10 freshness expires without a HA update and a repeated sample value recovers', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-14T12:00:00Z') });
  const config = { sensors: { ph: { entity: 'sensor.ph', freshness: { attribute: 'sampled_at', max_age: 60 } } } };
  const states = { 'sensor.ph': { state: '7.5', attributes: { sampled_at: '2026-11-14T12:00:00Z' } } };
  await mount(page, { config, states });
  await expect(page.locator('.gauge-value')).toHaveText('7.5');
  await page.clock.fastForward(60001);
  await expect(page.locator('.gauge-value')).toHaveText('Stale');
  await expect(page.locator('.gauge-indicator')).toHaveCount(0);
  await page.evaluate(() => { card.hass = { ...card.hass, states: { 'sensor.ph': { state: '7.5', attributes: { sampled_at: new Date().toISOString() } } } }; });
  await expect(page.locator('.gauge-value')).toHaveText('7.5');
  await page.evaluate(() => card.remove());
  expect(await page.evaluate(() => card._freshnessTimer)).toBeNull();
});

test('C10 freshness reconfiguration clears timers and unknown timestamps cannot imply freshness', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-14T12:00:00Z') });
  const config = { sensors: { ph: { entity: 'sensor.ph', freshness: { entity: 'sensor.sample_time', max_age: 60 } } } };
  await mount(page, { config });
  await expect(page.locator('.gauge-value')).toHaveText('---');
  await updateState(page, 'sensor.sample_time', '2026-11-14T12:01:00Z');
  await expect(page.locator('.gauge')).toHaveAttribute('aria-label', /future/);
  await updateState(page, 'sensor.sample_time', '2026-11-14T12:00:00Z');
  await expect(page.locator('.gauge-value')).toHaveText('7.5');
  await page.evaluate(() => card.setConfig({ sensors: { ph: { entity: 'sensor.ph' } } }));
  await page.clock.fastForward(60001);
  await expect(page.locator('.gauge-value')).toHaveText('7.5');
  expect(await page.evaluate(() => card._freshnessTimer)).toBeNull();
});

test('C10 expiry between rendering and scheduling still refreshes the displayed sample', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-14T12:00:00Z') });
  await mount(page, {
    config: { sensors: { ph: { entity: 'sensor.ph', freshness: { attribute: 'sampled_at', max_age: 60 } } } },
    states: { 'sensor.ph': { state: '7.5', attributes: { sampled_at: '2026-11-14T12:00:00Z' } } },
  });
  await page.evaluate(async () => {
    const updated = card.updated.bind(card);
    card.updated = function () {
      // The clock crosses the expiry after render, before the timer is armed.
      Date.now = () => Date.parse('2026-11-14T12:01:00Z');
      card.updated = updated;
      updated();
    };
    card.requestUpdate(); await card.updateComplete;
  });
  await page.clock.runFor(1);
  await expect(page.locator('.gauge-value')).toHaveText('Stale');
  await expect(page.locator('.gauge-indicator')).toHaveCount(0);
});

test('C11 optional more-info works with pointer and keyboard and does not call services', async ({ page }) => {
  await mount(page, { config: { sensors: { ph: { entity: 'sensor.ph', tap_action: { action: 'more-info', entity: 'sensor.history' } } } } });
  await page.evaluate(() => { window.moreInfo=[];document.addEventListener('hass-more-info', e => moreInfo.push(e.detail.entityId)); });
  const gauge = page.getByRole('button', { name: /pH:.*Open history/ });
  await gauge.click(); await gauge.focus(); await page.keyboard.press('Enter'); await page.keyboard.press('Space');
  await gauge.dispatchEvent('keydown', { key: 'Enter', repeat: true });
  expect(await page.evaluate(() => moreInfo)).toEqual(['sensor.history', 'sensor.history', 'sensor.history']);
  expect(await page.evaluate(() => calls)).toEqual([]);
  await page.evaluate(() => card.setConfig({ sensors: { ph: { entity: 'sensor.ph' } } }));
  await page.locator('.gauge').click();
  expect(await page.evaluate(() => moreInfo.length)).toBe(3);
});
