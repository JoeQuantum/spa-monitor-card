import { test, expect } from '@playwright/test';
import { mount, fixture, assertHealthy } from './helpers.js';
test.afterEach(({page})=>assertHealthy(page));

test('C08 uses a native card wrapper while retaining public style overrides',async({page})=>{
  await mount(page);
  await expect(page.locator('ha-card.card')).toHaveCount(1);
  await page.evaluate(()=>card.style.setProperty('--spa-card-radius','24px'));
  await expect(page.locator('ha-card.card')).toHaveCSS('border-radius','24px');
  await page.evaluate(()=>card.style.setProperty('--spa-card-padding','28px'));
  await expect(page.locator('ha-card.card')).toHaveCSS('padding','28px');
});

test('C08 Sections keeps content-driven height and protects the four-gauge width',async({page})=>{
  await mount(page);
  expect(await page.evaluate(()=>card.getGridOptions())).toEqual({columns:12,rows:'auto',min_columns:12});
  await page.evaluate(()=>card.setConfig({sensors:{ph:{entity:'sensor.ph'}}}));
  expect(await page.evaluate(()=>card.getGridOptions())).toEqual({columns:12,rows:'auto',min_columns:6});
  await page.evaluate(()=>card.style.setProperty('--spa-bar-height','240px'));
  const size=await page.evaluate(()=>({rows:card.getCardSize(),height:card.shadowRoot.querySelector('ha-card').getBoundingClientRect().height}));
  expect(size.rows).toBe(Math.ceil(size.height/50));
});
