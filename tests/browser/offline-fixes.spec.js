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

test('C05 Boost sends explicit state and suppresses repeated unconfirmed commands', async ({ page }) => {
  await mount(page);
  await page.locator('.boost-btn').click();
  await page.locator('.boost-btn').dispatchEvent('click');
  expect(await page.evaluate(() => calls)).toEqual([['switch', 'turn_on', { entity_id: 'switch.boost' }]]);
  await expect(page.locator('.boost-state')).toHaveText('Off');
  await expect(page.locator('.boost-btn')).toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('.boost-btn')).toBeDisabled();
  await updateState(page, 'switch.boost', 'on');
  await expect(page.locator('.boost-btn')).toBeEnabled();
  await expect(page.locator('.boost-btn')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.boost-btn').click();
  expect(await page.evaluate(() => calls.at(-1))).toEqual(['switch', 'turn_off', { entity_id: 'switch.boost' }]);
});

test('C06 Boost is a keyboard button and gauges have text equivalents', async ({ page }) => {
  await mount(page);
  const boost = page.getByRole('button', { name: 'Boost', exact: true });
  await boost.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(boost).toBeFocused();
  expect(await boost.evaluate(e => getComputedStyle(e).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Space');
  expect(await page.evaluate(() => calls[0][1])).toBe('turn_on');
  await updateState(page, 'switch.boost', 'on');
  await boost.focus();
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => calls[1][1])).toBe('turn_off');
  await expect(page.getByRole('img', { name: /Chlorine: 3.0 ppm; within configured target band/i })).toHaveCount(1);
});

test('C05 service failure recovers to the reported state without retry', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { card.hass.callService = (...args) => { calls.push(args); return Promise.reject(new Error('Rejected')); }; });
  await page.locator('.boost-btn').click();
  await expect(page.locator('.boost-btn')).toBeEnabled();
  await expect(page.locator('.boost-btn')).toHaveAttribute('title', /failed/);
  await expect(page.locator('.boost-state')).toHaveText('Off');
  await page.evaluate(() => { card.hass.callService = (...args) => { calls.push(args); return Promise.resolve(); }; });
  await page.locator('.boost-btn').click();
  expect(await page.evaluate(() => calls.map(c => c[1]))).toEqual(['turn_on', 'turn_on']);
});

test('C05 lost reports time out without retries or a fabricated Boost state', async ({ page }) => {
  await page.clock.install(); await mount(page);
  await page.locator('.boost-btn').click();
  await page.clock.fastForward(15001);
  await expect(page.locator('.boost-btn')).toBeEnabled();
  await expect(page.locator('.boost-btn')).toHaveAttribute('title', /timed out/);
  await expect(page.locator('.boost-btn')).toHaveAttribute('aria-pressed', 'false');
  expect(await page.evaluate(() => calls.length)).toBe(1);
  await updateState(page, 'switch.boost', 'on');
  await page.locator('.boost-btn').click();
  expect(await page.evaluate(() => calls.at(-1)[1])).toBe('turn_off');
});

test('C05 invalid reports, replaced entities and removed cards discard pending Boost', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { window.pending = []; card.hass.callService = (...args) => { calls.push(args); return new Promise((resolve, reject) => pending.push({ resolve, reject })); }; });
  await page.locator('.boost-btn').click();
  for (const state of ['unavailable', 'unknown', 'error', 'true', '']) {
    await updateState(page, 'switch.boost', state);
    await expect(page.locator('.boost-btn')).toBeDisabled();
    await page.locator('.boost-btn').dispatchEvent('click');
    await expect(page.locator('.boost-btn')).toHaveAttribute('aria-busy', 'false');
  }
  expect(await page.evaluate(() => calls.length)).toBe(1);
  await updateState(page, 'switch.boost', 'off');
  await page.locator('.boost-btn').click();
  await page.evaluate(() => pending[0].reject(new Error('Old request failed')));
  await expect(page.locator('.boost-btn')).toHaveAttribute('aria-busy', 'true');
  await page.evaluate(() => card.setConfig({ ...card.getConfig(), controls: {} }));
  await page.evaluate(() => pending[1].resolve());
  expect(await page.evaluate(() => calls.length)).toBe(2);
  await page.evaluate(config => card.setConfig(config), fixture.config);
  await page.locator('.boost-btn').click();
  await page.evaluate(() => { card.remove(); pending[2].reject(new Error('Removed')); });
  expect(await page.evaluate(() => card._pendingBoost)).toBeNull();
  expect(await page.evaluate(() => calls.length)).toBe(3);
});

test('C05 a report before service completion confirms Boost and isolates later failures', async ({ page }) => {
  await mount(page);
  await page.evaluate(() => { window.rejects = []; card.hass.callService = (...args) => { calls.push(args); return new Promise((resolve, reject) => rejects.push(reject)); }; });
  await page.locator('.boost-btn').click();
  await updateState(page, 'switch.boost', 'on');
  await expect(page.locator('.boost-btn')).toBeEnabled();
  await page.locator('.boost-btn').click();
  await page.evaluate(() => rejects[0](new Error('Late failure')));
  await expect(page.locator('.boost-btn')).toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('.boost-btn')).toHaveAttribute('title', /Requested Boost off/);
  await updateState(page, 'switch.boost', 'off');
  expect(await page.evaluate(() => calls.map(c => c[1]))).toEqual(['turn_on', 'turn_off']);
});

test('C02 missing startup entities render unavailable and invalid config leaves the last valid config intact', async ({ page }) => {
  await mount(page, { states: {} });
  await expect(page.locator('.gauge.unavailable')).toHaveCount(4);
  await expect(page.locator('.boost-btn')).toBeDisabled();
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

test('C06 output buttons work with keyboard and announce the reported value', async ({ page }) => {
  await mount(page);
  const increase = page.getByRole('button', { name: 'Increase output level' });
  await increase.focus(); await page.keyboard.press('Enter');
  await updateState(page, 'number.output', '4');
  await page.getByRole('button', { name: 'Decrease output level' }).focus();
  await page.keyboard.press('Space');
  expect(await page.evaluate(() => calls.map(c => c[2].value))).toEqual([4, 3]);
  await expect(page.locator('#output-report')).toHaveAttribute('aria-live', 'polite');
});
