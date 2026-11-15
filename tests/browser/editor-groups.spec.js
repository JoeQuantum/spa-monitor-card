import { test, expect } from '@playwright/test';
import { fixture, mount, assertHealthy } from './helpers.js';
test.afterEach(({ page }) => assertHealthy(page));

async function editor(page, config = fixture.config) {
  await mount(page);
  await page.evaluate(async config => {
    window.editor = document.createElement('spa-monitor-card-editor');
    editor.setConfig(config); editor.hass = card.hass;
    window.edits = [];
    editor.addEventListener('config-changed', event => { edits.push(structuredClone(event.detail.config)); card.setConfig(event.detail.config); editor.setConfig(event.detail.config); });
    document.querySelector('#mount').replaceChildren(editor);
    await editor.updateComplete;
  }, config);
  return page.locator('spa-monitor-card-editor');
}
const group = (page, id) => page.locator(`details[data-sensor="${id}"]`);
async function open(page, id) {
  const element = group(page, id);
  if (!(await element.evaluate(e => e.open))) await element.locator('summary').click();
  return element;
}
async function fill(group, label, value) {
  const field = group.getByLabel(label, { exact: true });
  await field.fill(value); await field.press('Tab');
}

// The built-card harness has no HA picker implementation. Its documented
// value-changed event is tested here; native pickers are exercised in the HA lab.
async function pick(group, label, value) {
  await group.locator(`ha-entity-picker[aria-label="${label}"]`).evaluate((element, value) => {
    element.dispatchEvent(new CustomEvent('value-changed', { detail: { value }, bubbles: true, composed: true }));
  }, value);
}

test('C09 approved sensor groups support keyboard expansion and lossless raw option editing', async ({ page }) => {
  const config = structuredClone(fixture.config);
  config.extension = { keep: true }; config.sensors.ph.extension = { keep: 0 };
  await editor(page, config);
  const summary = group(page, 'ph').locator('summary');
  await summary.focus(); await page.keyboard.press('Enter');
  await expect(group(page, 'ph')).toHaveAttribute('open', '');
  await fill(group(page, 'ph'), 'Label', 'Acidity');
  await fill(group(page, 'ph'), 'Decimal places', '0');
  await fill(group(page, 'ph'), 'Minimum', '5.5');
  await expect(group(page, 'ph').locator('summary')).toHaveText('Acidity');
  const changed = await page.evaluate(() => edits.at(-1));
  expect(changed.sensors.ph).toEqual({ entity: 'sensor.ph', extension: { keep: 0 }, name: 'Acidity', decimals: 0, min: 5.5 });
  expect(changed.extension).toEqual({ keep: true });
  expect(changed.sensors.salt).toEqual({ entity: 'sensor.salt' });
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('C09 invalid numeric drafts remain visible through HA feedback and publish only after correction', async ({ page }) => {
  await editor(page); const ph = await open(page, 'ph');
  await fill(ph, 'Minimum', '9');
  await expect(page.getByRole('alert')).toContainText('Changes not applied');
  expect(await page.evaluate(() => edits.length)).toBe(0);
  await page.evaluate(() => editor.setConfig(editor._acceptedConfig));
  await expect(ph.getByLabel('Minimum', { exact: true })).toHaveValue('9');
  await expect(ph.getByLabel('Minimum', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await fill(ph, 'Decimal places', '7.5oops');
  await expect(ph.getByLabel('Decimal places', { exact: true })).toHaveValue('7.5oops');
  expect(await page.evaluate(() => edits.length)).toBe(0);
  await page.getByRole('button', { name: 'Discard pending edits' }).click();
  await expect(ph.getByLabel('Minimum', { exact: true })).toHaveValue('');
  await expect(page.getByRole('alert')).toHaveCount(0);
  await expect(ph.getByLabel('Minimum', { exact: true })).toHaveAttribute('aria-invalid', 'false');
  await fill(ph, 'Decimal places', '101');
  await expect(page.getByRole('alert')).toContainText('decimals');
  await fill(ph, 'Decimal places', '0');
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.decimals)).toBe(0);
  expect(await page.evaluate(() => edits.length)).toBe(1);
});

test('C09 blank units differ from restoring the preset and clearing numeric overrides retains zero semantics', async ({ page }) => {
  await editor(page); const chlorine = await open(page, 'chlorine');
  await expect(chlorine.getByLabel('Unit', { exact: true })).toHaveValue('ppm');
  await fill(chlorine, 'Unit', '');
  expect(await page.evaluate(() => edits.at(-1).sensors.chlorine.unit)).toBe('');
  await chlorine.getByRole('button', { name: 'Use default unit' }).click();
  expect(await page.evaluate(() => Object.hasOwn(edits.at(-1).sensors.chlorine, 'unit'))).toBe(false);
  await expect(chlorine.getByLabel('Unit', { exact: true })).toHaveValue('ppm');
  await fill(chlorine, 'Decimal places', '0'); await fill(chlorine, 'Decimal places', '');
  expect(await page.evaluate(() => Object.hasOwn(edits.at(-1).sensors.chlorine, 'decimals'))).toBe(false);
});

test('C09 freshness and availability drafts apply atomically and preserve nested extensions on toggles', async ({ page }) => {
  await editor(page); const ph = await open(page, 'ph');
  await ph.getByLabel('Check sample age', { exact: true }).check();
  expect(await page.evaluate(() => edits.length)).toBe(0);
  await fill(ph, 'Sample timestamp attribute', 'sampled_at');
  expect(await page.evaluate(() => edits.length)).toBe(0);
  await fill(ph, 'Maximum sample age (minutes)', '0.05');
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.freshness)).toEqual({ attribute: 'sampled_at', max_age: 3 });
  await page.evaluate(() => editor.setConfig({ ...editor._config, sensors: { ...editor._config.sensors, ph: { ...editor._config.sensors.ph, freshness: { ...editor._config.sensors.ph.freshness, extension: 0 } } } }));
  await ph.getByLabel('Check sample age', { exact: true }).uncheck();
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.freshness)).toBeUndefined();
  await ph.getByLabel('Check sample age', { exact: true }).check();
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.freshness.extension)).toBe(0);
  await ph.getByLabel('Require an availability condition', { exact: true }).check();
  await pick(ph, 'Availability entity', 'switch.boost');
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.availability)).toEqual({ entity: 'switch.boost' });
  await fill(ph, 'Available state', 'off');
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.availability.state)).toBe('off');
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('C09 lifetime settings and explicit null formats preserve precision and validate reserve/divisor', async ({ page }) => {
  await editor(page); const iq = await open(page, 'iq_sensor');
  await fill(iq, 'Reserve hours', '0');
  await fill(iq, 'Hours per month', '0');
  await expect(page.getByRole('alert')).toContainText('hours_per_month');
  expect(await page.evaluate(() => edits.at(-1).sensors.iq_sensor)).toEqual({ entity: 'sensor.iq', hours_reserve: 0 });
  await fill(iq, 'Hours per month', '720');
  await iq.getByLabel('Display format', { exact: true }).selectOption('numeric');
  expect(await page.evaluate(() => edits.at(-1).sensors.iq_sensor)).toEqual({ entity: 'sensor.iq', hours_reserve: 0, hours_per_month: 720, display_format: 'numeric' });
  await fill(iq, 'Reserve hours', ''); await fill(iq, 'Hours per month', '');
  await page.evaluate(() => editor.setConfig({ ...editor._config, sensors: { ...editor._config.sensors, iq_sensor: { entity: 'sensor.iq', display_format: null } } }));
  await expect(iq.getByLabel('Display format', { exact: true })).toHaveValue('numeric');
  await expect(iq.getByLabel('Reserve hours', { exact: true })).toHaveCount(0);
});

test('C09 custom zones survive linear-mode round trips and custom rows survive removal', async ({ page }) => {
  const zones = [{ value: 10, position: 0, extension: true }, { value: 0, position: 100 }];
  const config = { sensors: { custom: { entity: 'sensor.ph', name: 'Custom', zones, extension: 0 }, ph: { entity: 'sensor.ph' } } };
  await editor(page, config); const custom = await open(page, 'custom');
  await fill(custom, 'Label', 'Custom label');
  expect(await page.evaluate(() => edits.at(-1).sensors.custom.zones)).toEqual(zones);
  await custom.getByLabel('Use a linear scale', { exact: true }).check();
  await expect(page.getByRole('alert')).toContainText('min');
  await fill(custom, 'Minimum', '0'); await fill(custom, 'Maximum', '10');
  expect(await page.evaluate(() => edits.at(-1).sensors.custom.zones)).toBeNull();
  await custom.getByLabel('Use a linear scale', { exact: true }).uncheck();
  expect(await page.evaluate(() => edits.at(-1).sensors.custom.zones)).toEqual(zones);
  await pick(custom, 'Custom label Entity', '');
  await expect(custom.locator('summary')).toHaveText('Custom label');
  await pick(custom, 'Custom label Entity', 'sensor.restored');
  expect(await page.evaluate(() => edits.at(-1).sensors.custom)).toEqual({ entity: 'sensor.restored', name: 'Custom label', zones, extension: 0, min: 0, max: 10 });
});

test('C09 device selection and history actions retain unrelated fields and optional overrides', async ({ page }) => {
  const config = structuredClone(fixture.config); config.sensors.ph.tap_action = { action: 'more-info', entity: 'sensor.history', extension: true };
  config.device_id = 42;
  const el = await editor(page, config);
  await expect(el.getByRole('alert')).toContainText('device_id');
  await el.getByLabel('Device for entity suggestions').selectOption('');
  await expect(el.getByRole('alert')).toHaveCount(0);
  await page.evaluate(() => { editor.hass = { ...editor.hass, devices: { first: { name: 'Aria' }, second: { name: 'Other spa' } }, entities: { 'sensor.ph': { device_id: 'first' } } }; });
  await el.getByLabel('Device for entity suggestions').selectOption('second');
  await expect(el.getByRole('status')).toContainText('outside the selected device');
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.entity)).toBe('sensor.ph');
  await el.getByLabel('Device for entity suggestions').selectOption('');
  expect(await page.evaluate(() => edits.at(-1).device_id)).toBeUndefined();
  const ph = await open(page, 'ph');
  await expect(ph.getByLabel('Reading action', { exact: true })).toHaveValue('more-info');
  await ph.getByLabel('Reading action', { exact: true }).selectOption('');
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.tap_action)).toBeUndefined();
  await ph.getByLabel('Reading action', { exact: true }).selectOption('more-info');
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.tap_action)).toEqual({ action: 'more-info', entity: 'sensor.history', extension: true });
  await pick(ph, 'History entity (optional)', '');
  expect(await page.evaluate(() => edits.at(-1).sensors.ph.tap_action)).toEqual({ action: 'more-info', extension: true });
});

test('C09 sensor groups fit narrow editors and preserve expanded state across unrelated edits', async ({ page }) => {
  await editor(page); const ph = await open(page, 'ph');
  await page.locator('#mount').evaluate(e => e.style.width = '280px');
  await page.locator('#card-title').fill('Spa');
  await expect(ph).toHaveAttribute('open', '');
  const size = await page.locator('.editor').evaluate(e => ({ client: e.clientWidth, scroll: e.scrollWidth }));
  expect(size.scroll).toBeLessThanOrEqual(size.client);
  await ph.locator('summary').focus(); await page.keyboard.press('Space');
  await expect(ph).not.toHaveAttribute('open');
});
