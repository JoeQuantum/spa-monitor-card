import { test } from 'node:test';
import assert from 'node:assert/strict';
import { finiteNumber, numberState, nextNumberStep } from '../src/numbers.js';

test('states require complete finite decimal numbers, while zero remains valid', () => {
  for (const input of ['error', '', ' ', 'NaN', 'Infinity', '-Infinity', '7.5oops', '0x10', '1_000', '1e309', null, undefined, true, [], {}, NaN, Infinity]) {
    assert.equal(finiteNumber(input), null, String(input));
  }
  for (const [input, expected] of [[0, 0], ['0', 0], ['-1.2', -1.2], [' +.5 ', .5], ['1e2', 100], ['1.', 1], [7.5, 7.5]]) {
    assert.equal(finiteNumber(input), expected);
  }
});

test('number metadata rejects malformed bounds/steps and out-of-range reports', () => {
  assert.deepEqual(numberState({ state: '0' }), { value: 0, min: 0, max: 10, step: 1 });
  for (const attributes of [{ min: null }, { max: '10bad' }, { min: 10, max: 0 }, { min: 3, max: 3 }, { step: 0 }, { step: -1 }, { step: Infinity }, { step: 'error' }]) {
    assert.equal(numberState({ state: '3', attributes }), null);
  }
  for (const state of ['error', '-1', '11', '']) assert.equal(numberState({ state }), null);
});

test('adjacent steps respect nonzero minima, off-grid reports and unreachable maxima', () => {
  const grid = { min: 1, max: 10, step: 2 };
  assert.equal(nextNumberStep(3, 1, grid), 5);
  assert.equal(nextNumberStep(4, 1, grid), 5);
  assert.equal(nextNumberStep(4, -1, grid), 3);
  assert.equal(nextNumberStep(9, 1, grid), null);
  assert.equal(nextNumberStep(10, -1, grid), 9);
  assert.equal(nextNumberStep(1, -1, grid), null);
});

test('fractional steps send stable decimal values and stop at bounds', () => {
  const grid = { min: .1, max: .9, step: .2 };
  let value = .1;
  for (const wanted of [.3, .5, .7, .9]) {
    value = nextNumberStep(value, 1, grid);
    assert.equal(value, wanted);
  }
  assert.equal(nextNumberStep(.9, 1, grid), null);
  assert.equal(nextNumberStep(.3, -1, grid), .1);
  assert.equal(nextNumberStep(.1, -1, grid), null);
});
