import {test,expect} from '@playwright/test';
import {fixture,mount,updateState,assertHealthy} from './helpers.js';
test.afterEach(({page})=>assertHealthy(page));
const config=()=>({sensors:{ph:{entity:'sensor.ph',trend:{entity:'sensor.rate',unit:'/h',deadband:0.2,hysteresis:0.1}}}});
const states=(rate='0.3')=>({...fixture.states,'sensor.rate':{state:rate,attributes:{unit_of_measurement:'/h'}}});

test('C11 approved captions show signed rates with accessible raw values and remain optional',async({page})=>{
  await mount(page,{config:config(),states:states()});
  await expect(page.locator('.gauge-trend')).toHaveText('Rising 0.30 /h');
  await expect(page.locator('.gauge')).toHaveAttribute('aria-label',/Trend: Rising 0.30 \/h; reported rate 0.3 \/h/);
  await expect(page.locator('.gauge-trend')).toHaveAttribute('aria-hidden','true');
  await updateState(page,'sensor.rate','-0.3');await expect(page.locator('.gauge-trend')).toHaveText('Falling 0.30 /h');
  await updateState(page,'sensor.rate','0');await expect(page.locator('.gauge-trend')).toHaveText('0.00 /h');
  await page.evaluate(config=>card.setConfig(config),fixture.config);
  await expect(page.locator('.gauge-trend')).toHaveCount(0);
  await expect(page.locator('.gauge-estimate')).toHaveText('Estimate');
  expect(await page.evaluate(()=>calls)).toEqual([]);
});

test('C11 captions retain direction through noise with separate state for each reading',async({page})=>{
  const c=config();c.sensors.chlorine={entity:'sensor.chlorine',trend:{entity:'sensor.other_rate',unit:'ppm/h',deadband:0.2,hysteresis:0.1}};
  await mount(page,{config:c,states:{...states(),'sensor.other_rate':{state:'0.2',attributes:{unit_of_measurement:'ppm/h'}}}});
  await expect(page.locator('.gauge-trend')).toHaveText(['Rising 0.30 /h','0.20 ppm/h']);
  for(const [rate,text] of [['0.2','Rising 0.20 /h'],['0.1','0.10 /h'],['-0.2','-0.20 /h'],['-0.3','Falling 0.30 /h'],['-0.2','Falling 0.20 /h']]){
    await updateState(page,'sensor.rate',rate);await expect(page.locator('.gauge-trend').first()).toHaveText(text);
  }
});

test('C11 invalid rates, primary values, units and availability hide captions and reset direction',async({page})=>{
  await mount(page,{config:config(),states:states()});
  for(const bad of ['unknown','unavailable','NaN','Infinity','0.3oops','']){
    await updateState(page,'sensor.rate',bad);await expect(page.locator('.gauge-trend')).toHaveCount(0);
    await updateState(page,'sensor.rate','0.2');await expect(page.locator('.gauge-trend')).toHaveText('0.20 /h');
    await updateState(page,'sensor.rate','0.3');
  }
  await updateState(page,'sensor.ph','unavailable');await expect(page.locator('.gauge-trend')).toHaveCount(0);
  await updateState(page,'sensor.rate','0.2');await updateState(page,'sensor.ph','7.5');
  await expect(page.locator('.gauge-trend')).toHaveText('0.20 /h');
  for(const unit of ['/min',undefined]){
    await page.evaluate(unit=>{card.hass={...card.hass,states:{...card.hass.states,'sensor.rate':{state:'0.3',attributes:{unit_of_measurement:unit}}}};},unit);
    await expect(page.locator('.gauge-trend')).toHaveCount(0);
    await expect(page.locator('.gauge')).not.toHaveAttribute('aria-label',/Trend:/);
  }
  const c=config();c.sensors.ph.trend.availability={entity:'binary_sensor.enabled'};
  await page.evaluate(c=>card.setConfig(c),c);
  await page.evaluate(()=>{card.hass={...card.hass,states:{...card.hass.states,'sensor.rate':{state:'0.3',attributes:{unit_of_measurement:'/h'}}}};});
  await expect(page.locator('.gauge-trend')).toHaveCount(0);
  await updateState(page,'binary_sensor.enabled','on');await expect(page.locator('.gauge-trend')).toHaveText('Rising 0.30 /h');
  await updateState(page,'binary_sensor.enabled','off');await expect(page.locator('.gauge-trend')).toHaveCount(0);
});

test('C11 coalesced unavailable reports, source changes and detach clear hysteresis',async({page})=>{
  await mount(page,{config:config(),states:states()});
  await page.evaluate(async()=>{
    const set=state=>{card.hass={...card.hass,states:{...card.hass.states,'sensor.rate':{state,attributes:{unit_of_measurement:'/h'}}}};};
    set('unavailable');set('0.2');await card.updateComplete;
  });
  await expect(page.locator('.gauge-trend')).toHaveText('0.20 /h');
  await updateState(page,'sensor.rate','0.3');
  const c=config();c.sensors.ph.trend.entity='sensor.other_rate';
  await page.evaluate(c=>{card.hass={...card.hass,states:{...card.hass.states,'sensor.other_rate':{state:'0.2',attributes:{unit_of_measurement:'/h'}}}};card.setConfig(c);},c);
  await expect(page.locator('.gauge-trend')).toHaveText('0.20 /h');
  await updateState(page,'sensor.other_rate','0.3');
  await page.evaluate(()=>card.remove());
  expect(await page.evaluate(()=>card._trendStates.size)).toBe(0);
  await updateState(page,'sensor.other_rate','0.2');
  await page.evaluate(()=>document.querySelector('#mount').append(card));
  await expect(page.locator('.gauge-trend')).toHaveText('0.20 /h');
});

test('C11 derivative and primary freshness expire independently without another HA report',async({page})=>{
  await page.clock.install({time:new Date('2026-11-15T12:00:00Z')});
  const c=config();c.sensors.ph.freshness={attribute:'sampled_at',max_age:90};c.sensors.ph.trend.freshness={attribute:'sampled_at',max_age:60};
  const s=states();s['sensor.ph'].attributes.sampled_at='2026-11-15T12:00:00Z';s['sensor.rate'].attributes.sampled_at='2026-11-15T12:00:00Z';
  await mount(page,{config:c,states:s});
  await expect(page.locator('.gauge-trend')).toHaveCount(1);
  await page.clock.fastForward(60000);
  await expect(page.locator('.gauge-trend')).toHaveCount(0);await expect(page.locator('.gauge-value')).toHaveText('7.5');
  await page.evaluate(()=>{card.hass={...card.hass,states:{...card.hass.states,'sensor.rate':{state:'0.2',attributes:{unit_of_measurement:'/h',sampled_at:new Date().toISOString()}}}};});
  await expect(page.locator('.gauge-trend')).toHaveText('0.20 /h');
  await page.clock.fastForward(30000);
  await expect(page.locator('.gauge-trend')).toHaveCount(0);await expect(page.locator('.gauge-value')).toHaveText('Stale');
  expect(await page.evaluate(()=>card._freshnessTimer)).toBeNull();
});

test('C11 a fresh report after suspended expiry does not inherit the old direction',async({page})=>{
  await page.clock.install({time:new Date('2026-11-15T12:00:00Z')});
  const c=config();c.sensors.ph.trend.freshness={attribute:'sampled_at',max_age:60};const s=states();s['sensor.rate'].attributes.sampled_at='2026-11-15T12:00:00Z';
  await mount(page,{config:c,states:s});
  await page.clock.setSystemTime(new Date('2026-11-15T12:02:00Z'));
  await page.evaluate(()=>{card.hass={...card.hass,states:{...card.hass.states,'sensor.rate':{state:'0.2',attributes:{unit_of_measurement:'/h',sampled_at:new Date().toISOString()}}}};});
  await expect(page.locator('.gauge-trend')).toHaveText('0.20 /h');
});

test('C11 derivative expiry between render and scheduling still removes the caption',async({page})=>{
  await page.clock.install({time:new Date('2026-11-15T12:00:00Z')});
  const c=config();c.sensors.ph.trend.freshness={attribute:'sampled_at',max_age:60};const s=states();s['sensor.rate'].attributes.sampled_at='2026-11-15T12:00:00Z';
  await mount(page,{config:c,states:s});
  await page.evaluate(async()=>{
    const updated=card.updated.bind(card);card.updated=()=>{Date.now=()=>Date.parse('2026-11-15T12:01:00Z');card.updated=updated;updated();};card.requestUpdate();await card.updateComplete;
  });
  await page.clock.runFor(1);await expect(page.locator('.gauge-trend')).toHaveCount(0);
});

test('C08 approved captions wrap at phone widths and inherit readable theme tokens',async({page})=>{
  const c=structuredClone(fixture.config);c.sensors.chlorine.trend={entity:'sensor.rate',unit:'ppm/h',decimals:6};c.sensors.ph.trend={entity:'sensor.other_rate',unit:'/h',decimals:6};
  const s={...states('-0.0000001'),'sensor.other_rate':{state:'0.3',attributes:{unit_of_measurement:'/h'}}};s['sensor.rate'].attributes.unit_of_measurement='ppm/h';
  await mount(page,{config:c,states:s});
  await expect(page.locator('.gauge-trend').first()).toHaveText('Falling < 0.000001 ppm/h');
  for(const theme of ['light','dark','glass']){
    await page.evaluate(c=>card.setConfig(c),{...c,theme});
    for(const width of [480,320,280]){
      await page.locator('#mount').evaluate((el,width)=>el.style.width=width+'px',width);
      const sizes=await page.locator('.card').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,captionBottom:Math.max(...[...el.querySelectorAll('.gauge-trend')].map(e=>e.getBoundingClientRect().bottom)),controlsTop:el.querySelector('.controls-row').getBoundingClientRect().top}));
      expect(sizes.scroll).toBeLessThanOrEqual(sizes.width);expect(sizes.captionBottom).toBeLessThan(sizes.controlsTop);
    }
  }
  await page.evaluate(()=>card.style.setProperty('--spa-trend-color','rgb(12, 34, 56)'));
  await expect(page.locator('.gauge-trend').first()).toHaveCSS('color','rgb(12, 34, 56)');
});
