import { describe, it } from 'node:test';
import assert from 'node:assert';
import { allCharCombinations } from '../lib/combinations';

describe('combinations', () => {
  it('generates all single-letter combinations of ABC', () => {
    const comb = [...allCharCombinations('ABC', 1, 1)];
    assert.deepStrictEqual(comb, ['A', 'B', 'C']);
  });
});
