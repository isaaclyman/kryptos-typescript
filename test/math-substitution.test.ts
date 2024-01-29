import { describe, it } from 'node:test';
import assert from 'node:assert';
import { addSimpleMathKey, subtractSimpleMathKey } from '../lib/math-substitution';
import { generateAlphabet, standardAlphabet } from '../lib/vigenere';

describe('math-substitution', () => {
  it('encrypts AAA', () => {
    const encrypted = addSimpleMathKey('AAA', [0, 1, 2], standardAlphabet);
    assert.strictEqual(encrypted, 'ABC');
  });

  it('decrypts ABC', () => {
    const message = subtractSimpleMathKey('ABC', [0, 1, 2], standardAlphabet);
    assert.strictEqual(message, 'AAA');
  });

  it('encrypts and decrypts a longer message', () => {
    const message = 'YANKEEDOODLEWENTTOTOWNRIDINGONAPONY';
    const key =  [1, 15, 60, 100];
    const encrypted = addSimpleMathKey(message, key, standardAlphabet);
    const decrypted = subtractSimpleMathKey(encrypted, key, standardAlphabet);
    assert.strictEqual(decrypted, message);
  });

  it('encrypts and decrypts with the KRYPTOS alphabet', () => {
    const message = 'YANKEEDOODLEWENTTOTOWNRIDINGONAPONY';
    const key =  [1, 15, 60, 100];
    const kAlphabet = generateAlphabet('KRYPTOS');
    const encrypted = addSimpleMathKey(message, key, kAlphabet);
    const decrypted = subtractSimpleMathKey(encrypted, key, kAlphabet);
    assert.strictEqual(decrypted, message);
  });
});
