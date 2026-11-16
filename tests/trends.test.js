import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveConfig } from '../src/config.js';
import { readTrend, trendDirection, trendText } from '../src/trends.js';

const config = trend => ({ sensors: { ph: { entity: 'sensor.ph', trend } } });
const resolve = (options = {}) => resolveConfig(config({ entity: 'sensor.rate', unit: 'pH/h', ...options })).sensors.ph.trend;
const states = (value, unit = 'pH/h') => ({ 'sensor.rate': { state: value, attributes: { unit_of_measurement: unit } } });

test('trend contracts reject malformed sources, units, precision and thresholds without mutating YAML', () => {
  for (const bad of [null, [], {}, { entity: 'binary_sensor.rising', unit: 'pH/h' }]) assert.throws(() => resolveConfig(config(bad)), /sensors.ph.trend/);
  for (const options of [{deadband:null},{hysteresis:null},{decimals:null},{unit:''},{unit:'pH'},{unit:'pH/hour'},{deadband:-1},{deadband:'0'},{hysteresis:-1},{hysteresis:1},{decimals:7},{decimals:1.5},{deadband:Number.MAX_VALUE,hysteresis:Number.MAX_VALUE}]) assert.throws(() => resolve(options), /sensors.ph.trend/);
  const source = config({entity:'sensor.rate',unit:'pH/h',deadband:0,decimals:0,extension:{keep:true},freshness:{attribute:'sampled_at',max_age:60,extension:0}});
  const before=structuredClone(source);const result=resolveConfig(source);
  assert.deepEqual(source,before);assert.equal(result.sensors.ph.trend.decimals,0);assert.deepEqual(result.sensors.ph.trend.extension,{keep:true});
});

test('unitless HA derivatives retain their explicit rate unit and attribute sources never fall back', () => {
  const options=resolve({entity:'sensor.unitless',unit:'/h',attribute:'rate'});
  const input={'sensor.unitless':{state:'7.5',attributes:{unit_of_measurement:'/h',rate:0.02}}};
  assert.equal(readTrend(options,input,{value:7.5}).direction,'rising');
  assert.equal(trendText(readTrend(options,input,{value:7.5}),2),'Rising 0.02 /h');
  delete input['sensor.unitless'].attributes.rate;
  assert.equal(readTrend(options,input,{value:7.5}),null);
  for(const unit of [' /h','/h ','ppm/h\n','/week'])assert.throws(()=>resolve({unit}),/trend.unit/);
});

test('trend hysteresis remains stable through threshold noise, resets at exit and changes direction deliberately', () => {
  const options=resolve({deadband:1,hysteresis:0.2});
  let direction='flat';
  const sequence=[[1.19,'flat'],[1.2,'rising'],[1.01,'rising'],[0.81,'rising'],[0.8,'flat'],[0,'flat'],[-1.19,'flat'],[-1.2,'falling'],[-0.81,'falling'],[-0.8,'flat'],[1.3,'rising'],[-1.3,'falling']];
  for(const [value,expected] of sequence){direction=trendDirection(value,options,direction);assert.equal(direction,expected,String(value));}
  assert.equal(trendDirection(0,resolve()),'flat');assert.equal(trendDirection(-0,resolve()),'flat');assert.equal(trendDirection(0.001,resolve()),'rising');
  const decimal=resolve({deadband:0.2,hysteresis:0.1});
  assert.equal(trendDirection(0.3,decimal),'rising');assert.equal(trendDirection(-0.3,decimal),'falling');
  assert.equal(trendDirection(0.1,decimal,'rising'),'flat');assert.equal(trendDirection(-0.1,decimal,'falling'),'flat');
});

test('trends require finite derivative data and exact declared units; an unavailable primary suppresses them', () => {
  const options=resolve();
  for(const value of [undefined,'unknown','unavailable','',null,'1oops','Infinity',true])assert.equal(readTrend(options,states(value),{value:7.5}),null);
  for(const unit of [undefined,'','pH/min','ppm/h']){
    const input=states('0.2');input['sensor.rate'].attributes.unit_of_measurement=unit;
    assert.equal(readTrend(options,input,{value:7.5}),null);
  }
  assert.equal(readTrend(options,states('0.2'),{value:null}),null);
  assert.equal(readTrend(options,states('0'),{value:7.5}).value,0);
  assert.equal(readTrend(options,states('-0.2'),{value:7.5}).direction,'falling');
});

test('derivative freshness and availability use explicit contracts, never HA transport age', () => {
  const now=Date.parse('2026-11-15T12:00:00Z');
  const options=resolve({freshness:{attribute:'sampled_at',max_age:60},availability:{entity:'binary_sensor.enabled'}});
  const input=states('0.2');input['binary_sensor.enabled']={state:'on'};input['sensor.rate'].last_updated=new Date(now).toISOString();
  assert.equal(readTrend(options,input,{value:7.5},'flat',now),null);
  input['sensor.rate'].attributes.sampled_at=new Date(now).toISOString();
  assert.equal(readTrend(options,input,{value:7.5},'flat',now).expiresAt,now+60000);
  assert.equal(readTrend(options,input,{value:7.5},'flat',now+60000),null);
  input['binary_sensor.enabled'].state='unknown';assert.equal(readTrend(options,input,{value:7.5},'flat',now),null);
});

test('trend text does not round tiny changes into a directed zero or call a deadband proof of stability', () => {
  assert.equal(trendText({value:0.001,direction:'rising',unit:'pH/h'},2),'Rising < 0.01 pH/h');
  assert.equal(trendText({value:-0.2,direction:'falling',unit:'pH/h'},2),'Falling 0.20 pH/h');
  assert.equal(trendText({value:0.1,direction:'flat',unit:'pH/h'},2),'0.10 pH/h');
  assert.equal(trendText({value:-0.001,direction:'flat',unit:'pH/h'},2),'0.00 pH/h');
});
