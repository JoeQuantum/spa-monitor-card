import { test } from 'node:test';
import assert from 'node:assert/strict';
import { finiteNumber, numberState } from '../src/numbers.js';

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
