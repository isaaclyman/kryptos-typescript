import { describe, it } from 'node:test';
import assert from 'node:assert';
import { skipTest } from '../lib/skip-test';

describe('skip-test', () => {
  it('matches a simple skip cipher', () => {
    const encrypted = 'OWELETIVAR';
    const match = skipTest(encrypted, 'ILOVEWATER', false);
    assert.notStrictEqual(match, null);
    assert.strictEqual(match.skip, 7);
  });
});
