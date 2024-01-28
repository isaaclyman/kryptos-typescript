import { describe, it } from 'node:test';
import assert from 'node:assert';
import { skipTest } from '../lib/skip';

describe('skip-test', () => {
  it('matches a simple skip cipher', () => {
    const encrypted = 'OWELETIVAR';
    const match = skipTest(encrypted, 'ILOVEWATER', false);
    assert.notStrictEqual(match, null);
    assert.strictEqual(match.skip, 7);
  });

  it('decodes k3', () => {
    const encrypted =
      'ENDYAHROHNLSRHEOCPTEOIBIDYSHNAIA' +
      'CHTNREYULDSLLSLLNOHSNOSMRWXMNETP' +
      'RNGATIHNRARPESLNNELEBLPIIACAEWMT' +
      'WNDITEENRAHCTENEUDRETNHAEOETFOLS' +
      'EDTIWENHAEIOYTEYQHEENCTAYCREIFTB' +
      'RSPAMHHEWENATAMATEGYEERLBTEEFOAS' +
      'FIOTUETUAEOTOARMAEERTNRTIBSEDDNI' +
      'AAHTTMSTEWPIEROAGRIEWFEBAECTDDHI' +
      'LCEIHSITEGOEAOSDDRYDLORITRKLMLEH' +
      'AGTDHARDPNEOHMGFMFEUHEECDMRIPFEI' +
      'MEHNLSSTTRTVDOHW?';
    const match = skipTest(encrypted, 'PASSAGEDEBRIS', false);
    assert.notStrictEqual(match, null);
    assert.strictEqual(match.skip, 192);
  });
});
