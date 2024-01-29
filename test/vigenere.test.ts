import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  vigDecrypt,
  vigEncrypt,
} from '../lib/vigenere';
import { generateAlphabet, standardAlphabet } from '../lib/alphabet';

describe('vigenere', () => {
  it('encrypts ILOVEWATER (standard alphabet)', () => {
    const encrypted = vigEncrypt('ILOVEWATER', 'HYDRATE', standardAlphabet);
    assert.strictEqual(encrypted, 'PJRMEPEACU');
  });

  it('decrypts ILOVEWATER (standard alphabet)', () => {
    const decrypted = vigDecrypt('PJRMEPEACU', 'HYDRATE', standardAlphabet);
    assert.strictEqual(decrypted, 'ILOVEWATER');
  });

  it('encrypts and decrypts ILOVEWATER (Kryptos alphabet)', () => {
    const message = 'ILOVEWATER';
    const encrypted = vigEncrypt(
      message,
      'HYDRATE',
      generateAlphabet('KRYPTOS')
    );
    const decrypted = vigDecrypt(
      encrypted,
      'HYDRATE',
      generateAlphabet('KRYPTOS')
    );
    assert.strictEqual(decrypted, message);
  });

  it('decrypts k1', () => {
    const encrypted = `EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJYQTQUXQBQVYUVLLTREVJYQTMKYRDMFD`;
    const expected = `BETWEENSUBTLESHADINGANDTHEABSENCEOFLIGHTLIESTHENUANCEOFIQLUSION`;
    const decrypted = vigDecrypt(encrypted, 'PALIMPSEST', generateAlphabet('KRYPTOS'));
    assert.strictEqual(decrypted, expected);
  });

  it('decrypts k2', () => {
    const encrypted = 'VFPJUDEEHZWETZYVGWHKKQETGFQJNCE'
    + 'GGWHKK?DQMCPFQZDQMMIAGPFXHQRLG'
    + 'TIMVMZJANQLVKQEDAGDVFRPJUNGEUNA'
    + 'QZGZLECGYUXUEENJTBJLBQCRTBJDFHRR'
    + 'YIZETKZEMVDUFKSJHKFWHKUWQLSZFTI'
    + 'HHDDDUVH?DWKBFUFPWNTDFIYCUQZERE'
    + 'EVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDX'
    + 'FLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKF'
    + 'FHQNTGPUAECNUVPDJMQCLQUMUNEDFQ'
    + 'ELZZVRRGKFFVOEEXBDMVPNFQXEZLGRE'
    + 'DNQFMPNZGLFLPMRJQYALMGNUVPDXVKP'
    + 'DQUMEBEDMHDAFMJGZNUPLGEWJLLAETG';
    const expected = 'ITWASTOTALLYINVISIBLEHOWSTHATPO'
    + 'SSIBLE?THEYUSEDTHEEARTHSMAGNET'
    + 'ICFIELDXTHEINFORMATIONWASGATHER'
    + 'EDANDTRANSMITTEDUNDERGRUUNDTOANU'
    + 'NKNOWNLOCATIONXDOESLANGLEYKNOWA'
    + 'BOUTTHIS?THEYSHOULDITSBURIEDOUT'
    + 'THERESOMEWHEREXWHOKNOWSTHEEXACTL'
    + 'OCATION?ONLYWWTHISWASHISLASTMES'
    + 'SAGEXTHIRTYEIGHTDEGREESFIFTYSE'
    + 'VENMINUTESSIXPOINTFIVESECONDSNO'
    + 'RTHSEVENTYSEVENDEGREESEIGHTMINU'
    + 'TESFORTYFOURSECONDSWESTIDBYROWS';
    const decrypted = vigDecrypt(encrypted, 'ABSCISSA', generateAlphabet('KRYPTOS'));
    assert.strictEqual(decrypted, expected);
  });
});
