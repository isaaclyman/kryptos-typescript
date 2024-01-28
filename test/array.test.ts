import { describe, it } from 'node:test';
import { chunk } from '../lib/array';
import assert from 'node:assert';

describe('chunk', () => {
  it('chunks 123456', () => {
    const chunked = chunk('123456'.split(''), 3);
    assert.deepStrictEqual([['1', '2', '3'], ['4', '5', '6']], chunked);
  });

  it('chunks 1234567', () => {
    const chunked = chunk('1234567'.split(''), 3);
    assert.deepStrictEqual([['1', '2', '3'], ['4', '5', '6'], ['7']], chunked);
  });
});
