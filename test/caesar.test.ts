import { describe, it } from 'node:test';
import assert from 'node:assert';
import { cDecrypt, cEncrypt } from '../lib/caesar';
import { generateAlphabet, standardAlphabet } from '../lib/vigenere';

describe('caesar', () => {
  it('encrypts ABCDE (standard alphabet)', () => {
    const encrypted = cEncrypt('ABCDE', 1, standardAlphabet);
    assert.strictEqual(encrypted, 'BCDEF');
  });

  it('decrypts BCDEF (standard alphabet)', () => {
    const decrypted = cDecrypt('BCDEF', 1, standardAlphabet);
    assert.strictEqual(decrypted, 'ABCDE');
  });

  it('encrypts and decrypts (Kryptos alphabet)', () => {
    const message = 'ILOVEWATER';
    const encrypted = cEncrypt(message, -5, generateAlphabet('KRYPTOS'));
    const decrypted = cDecrypt(encrypted, -5, generateAlphabet('KRYPTOS'));
    assert.strictEqual(decrypted, message);
  });
});
