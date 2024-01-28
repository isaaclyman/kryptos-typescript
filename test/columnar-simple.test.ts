import { describe, it } from 'node:test';
import assert from 'node:assert';
import { columnarDecrypt, columnarEncrypt } from '../lib/columnar-simple';

describe('columnar-simple', () => {
  it('encrypts ILOVEWATER', () => {
    const encrypted = columnarEncrypt('ILOVEWATER', 'HYDRATE');
    assert.strictEqual(encrypted, 'EORAITVWLE');
  });
  
  it('decrypts ILOVEWATER', () => {
    const decrypted = columnarDecrypt('EORAITVWLE', 'HYDRATE');
    assert.strictEqual(decrypted, 'ILOVEWATER');
  });
});
