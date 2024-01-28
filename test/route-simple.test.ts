import { describe, it } from 'node:test';
import assert from 'node:assert';
import { routeDecrypt, routeEncrypt } from '../lib/route-simple';

describe('route-simple', () => {
  it('encrypts THEFITNESSGRAMPACERTEST...', () => {
    const message = 'THEFITNESSGRAMPACERTESTISAMULTISTAGEAEROBICCAPACITYTEST';
    const encrypted = routeEncrypt(message, 15, 4);
    assert.strictEqual(encrypted, 'TAIPITGTSIRSAUCHCSATEEYSSOTMLCEETCNSATGABQPTAFRAIETEERMI');
  });

  it('decrypts THEFITNESSGRAMPACERTEST...', () => {
    const encrypted = 'TAIPITGTSIRSAUCHCSATEEYSSOTMLCEETCNSATGABQPTAFRAIETEERMI';
    const decrypted = routeDecrypt(encrypted, 15, 4);
    assert.strictEqual(decrypted, 'THEFITNESSGRAMPACERTESTISAMULTISTAGEAEROBICCAPACITYTESTQ');
  });
});
