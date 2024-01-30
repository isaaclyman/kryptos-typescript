import { describe, it } from 'node:test';
import assert from 'node:assert';
import { standardAlphabet } from '../lib/alphabet';
import { hillEncrypt, hillDecrypt } from '../lib/hill';

describe('hill', () => {
  const testKey = [
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15]
  ];
  
  it('encrypts ACT', () => {
    const encrypted = hillEncrypt('ACT', testKey, standardAlphabet)
    assert.strictEqual(encrypted, 'POH');
  });

  it('decrypts ACT', () => {
    const message = hillDecrypt('POH', testKey, standardAlphabet);
    assert.strictEqual(message, 'ACT');
  });

  it('encrypts CAT', () => {
    const encrypted = hillEncrypt('CAT', testKey, standardAlphabet);
    assert.strictEqual(encrypted, 'FIN');
  });

  it('decrypts CAT', () => {
    const message = hillDecrypt('FIN', testKey, standardAlphabet);
    assert.strictEqual(message, 'CAT');
  })
});
