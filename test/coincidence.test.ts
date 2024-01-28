import { describe, it } from 'node:test';
import { getCoincidence } from '../lib/coincidence';
import { standardAlphabet } from '../lib/vigenere';
import assert from 'node:assert';
import { encryptedK4 } from '../k4';

describe('coincidence', () => {
  it('correctly measures the coincidence of a random distribution', () => {
    // The coincidence of the alphabet repeated once is 0.0, for math reasons.
    // As you repeat the alphabet more times, you approach an asymptote of 1.0.
    const cAlpha = getCoincidence(standardAlphabet.repeat(100));
    // Round to three decimal places
    const roundedCAlpha = round(cAlpha, 3);
    const kappa = 1 / 26;
    const roundedKappa = round(kappa, 3);
    assert.strictEqual(roundedCAlpha, roundedKappa);
  });

  it('correctly measures the coincidence of an English plaintext', () => {
    const message = (
      `Four score and seven years ago our fathers brought forth` +
      `on this continent, a new nation, conceived in Liberty, and dedicated to` +
      `the proposition that all men are created equal.`
    )
      .replace(/[ \.\,]/g, '')
      .toUpperCase();
    const cMessage = getCoincidence(message);
    const roundedCMessage = round(cMessage, 3);
    assert.strictEqual(roundedCMessage, 0.068);
  });

  it('correctly measures the coincidence of K3', () => {
    const message =
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
      'MEHNLSSTTRTVDOHW';
    const cMessage = getCoincidence(message);
    const roundedCMessage = round(cMessage, 3);
    assert.strictEqual(roundedCMessage, 0.066);
  });

  it('correctly measures the coincidence of K4', () => {
    const message = encryptedK4;
    const cMessage = getCoincidence(message);
    const roundedCMessage = round(cMessage, 3);
    assert.strictEqual(roundedCMessage, 0.036);
  });
});

function round(value: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}
