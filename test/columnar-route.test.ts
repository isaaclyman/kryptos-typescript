import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  routedColumnarDecrypt,
  routedColumnarEncrypt,
} from '../lib/columnar-route';

describe('columnar-route', () => {
  it('encrypts THEREAREMOREHYDROGEN...', () => {
    const message =
      'THEREAREMOREHYDROGENATOMSINAWATERMOLECULETHANSTARSINTHESOLARSYSTEM';
    const encrypted = routedColumnarEncrypt(message, 15, 'PLANETS');
    assert.strictEqual(
      encrypted,
      'LHAHMILAAAAWYQNETRRNADTCOESSTRTSEIRTRMERHUMMYTEOHOTNEESONEELSOSARGE'
    );
  });

  it('decrypts THEREAREMOREHYDROGEN...', () => {
    const encrypted =
      'LHAHMILAAAAWYQNETRRNADTCOESSTRTSEIRTRMERHUMMYTEOHOTNEESONEELSOSARGE';
    const decrypted = routedColumnarDecrypt(encrypted, 15, 'PLANETS');
    assert.strictEqual(
      decrypted,
      'THEREAREMOREHYDROGENATOMSINAWATERMOLECULETHANSTARSINTHESOLARSYSTEMQ'
    );
  });

  it('decrypts K3', () => {
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
    const decrypted = routedColumnarDecrypt(encrypted, 86, 'KRYPTOS');
    assert.strictEqual(
      decrypted,
      '?SLOWLYDESPARATLYSLOWLYTHEREMAINSOFPASSAGEDEBRISTHATENCUM' +
        'BEREDTHELOWERPARTOFTHEDOORWAYWASREMOVEDWITHTREMBLINGHANDS' +
        'IMADEATINYBREACHINTHEUPPERLEFTHANDCORNERANDTHENWIDENINGTH' +
        'EHOLEALITTLEIINSERTEDTHECANDLEANDPEEREDINTHEHOTAIRESCAPIN' +
        'GFROMTHECHAMBERCAUSEDTHEFLAMETOFLICKERBUTPRESENTLYDETAILS' +
        'OFTHEROOMWITHINEMERGEDFROMTHEMISTXCANYOUSEEANYTHINGQ'
    );
  });
});
