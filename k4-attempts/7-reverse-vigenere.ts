// Answering the question, what Vignere key translates:
// FLRVQQPRNGKSS > EASTNORTHEAST
// NYPVTTMZFPK > BERLINCLOCK

import {
  generateAlphabet,
  lettersToNumbers,
  standardAlphabet,
} from '../lib/alphabet';
import { getCoincidence } from '../lib/coincidence';
import { vigDecrypt } from '../lib/vigenere';

const kAlpha = generateAlphabet('KRYPTOS');

// FLRVQQPRNGKSS + ? = EASTNORTHEAST
// EASTNORTHEAST - FLRVQQPRNGKSS = ?
const key1 = vigDecrypt(
  'EASTNORTHEAST',
  'FLRVQQPRNGKSS',
  kAlpha
);
console.log({
  key1std: key1,
  numeric: lettersToNumbers(key1, standardAlphabet),
  coincidence: getCoincidence(key1),
});
console.log({
  key1kry: key1,
  numeric: lettersToNumbers(key1, kAlpha),
  coincidence: getCoincidence(key1),
});

// DISTANCES: STANDARD ALPHABET
// [ F,  L,  R,  V,  Q,  Q,  P,  R,  N,  G,  K,  S,  S]
// [ E,  A,  S,  T,  N,  O,  R,  T,  H,  E,  A,  S,  T]
// [25,  9, 14,  1, 25,  4, 23, 15, 20, 23,  0, 10, 23] ENCRYPTION DISTANCE
// [ ?, 10,  5, 13, 12,  5, 19, 18,  5,  3,  3, 10, 13] ADD ONLY
// [ ?, 16, 21, 13,  2, 21,  7,  8, 21, 23, 23, 16, 13] SUBTRACT ONLY

// DISTANCES: KRYPTOS ALPHABET
// [ E,  A,  S,  T,  N,  O,  R,  T,  H,  E,  A,  S,  T]
// [25, 16,  5,  8, 25, 11, 24,  3, 21, 24,  7,  0, 24] ENCRYPTION DISTANCE
// [ ?, 17, 15,  3, 17, 12, 13,  5, 18,  3,  9, 19, 24] ADD ONLY
// [ ?,  9, 11, 23,  9,  4, 13, 21,  8, 23, 17,  7,  2] SUBTRACT ONLY

const key2 = vigDecrypt('EASTNORTHEAST', 'FLRVQQPRNGKSS', standardAlphabet);
console.log({
  key2std: key2,
  numeric: lettersToNumbers(key2, standardAlphabet),
  coincidence: getCoincidence(key2),
});
console.log({
  key2kry: key2,
  numeric: lettersToNumbers(key2, kAlpha),
  coincidence: getCoincidence(key2),
});

// DISTANCES: STANDARD ALPHABET
// [ E,  A,  S,  T,  N,  O,  R,  T,  H,  E,  A,  S,  T]
// [25, 15,  1, 24, 23, 24,  2,  2, 20, 24, 16,  0,  1] ENCRYPTION DISTANCE
// [ ?, 16, 12, 23, 25,  1,  4,  0, 18,  4, 18, 10,  1] ADD ONLY
// [ ?, 10, 14,  3,  1, 25, 22,  0,  8, 22,  8, 16, 25] SUBTRACT ONLY

// DISTANCES: KRYPTOS ALPHABET
// [ E,  A,  S,  T,  N,  O,  R,  T,  H,  E,  A,  S,  T]
// [25,  3,  8,  2, 24,  2,  9,  9, 21,  2, 20,  7,  8] ENCRYPTION DISTANCE
// [ ?,  4,  5, 20, 22,  4,  5,  0, 12,  7, 18, 13,  1] ADD ONLY
// [ ?, 22, 21,  6,  4, 22, 21,  0, 14, 19,  8, 13, 25] SUBTRACT ONLY


// NYPVTTMZFPK + ? = BERLINCLOCK
// BERLINCLOCK - NYPVTTMZFPK = ?
const key3 = vigDecrypt(
  'BERLINCLOCK',
  'NYPVTTMZFPK',
  kAlpha
);
console.log({
  key3std: key3,
  numeric: lettersToNumbers(key3, standardAlphabet),
  coincidence: getCoincidence(key3),
});
console.log({
  key3kry: key3,
  numeric: lettersToNumbers(key3, kAlpha),
  coincidence: getCoincidence(key3),
});

// DISTANCES: STANDARD ALPHABET
// [B,  E,  R,  L,  I,  N,  C,  L,  O,  C,  K]
// [8,  2, 23, 20,  4,  8, 11, 12, 13, 18, 10] ENCRYPTION DISTANCE
// [?, 20, 21, 23,  7,  4,  3,  1,  1,  5, 18] ADD ONLY
// [?   6,  5,  3, 16, 22, 23, 25, 25, 21,  8] SUBTRACT ONLY

// DISTANCES: KRYPTOS ALPHABET
// [ B,  E,  R,  L,  I,  N,  C,  L,  O,  C,  K]
// [15,  9, 24, 21, 11, 15, 17, 18, 19,  6,  0] ENCRYPTION DISTANCE
// [ ?, 10, 15, 23, 16,  4,  2,  1,  1, 13, 20] ADD ONLY
// [ ?, 16, 11,  3, 10, 22, 24, 25, 25, 13,  6] SUBTRACT ONLY

const key4 = vigDecrypt('BERLINCLOCK', 'NYPVTTMZFPK', standardAlphabet);
console.log({
  key4std: key4,
  numeric: lettersToNumbers(key4, standardAlphabet),
  coincidence: getCoincidence(key4),
});
console.log({
  key4kry: key4,
  numeric: lettersToNumbers(key4, kAlpha),
  coincidence: getCoincidence(key4),
});

// DISTANCES: STANDARD ALPHABET
// [ B,  E,  R,  L,  I,  N,  C,  L,  O,  C,  K]
// [14,  6,  2, 16, 15, 20, 16, 12,  9, 13,  0] ENCRYPTION DISTANCE
// [ ?, 18, 22, 14, 25,  5, 22, 22, 23,  4, 13] ADD ONLY
// [ ?,  8,  4, 12,  1, 21,  4,  4,  3, 22, 13] SUBTRACT ONLY

// DISTANCES: KRYPTOS ALPHABET
// [ B,  E,  R,  L,  I,  N,  C,  L,  O,  C,  K]
// [ 5, 13,  9, 20,  3, 21, 20, 18, 16, 19,  7] ENCRYPTION DISTANCE
// [ ?,  8, 22, 11,  9, 18, 25, 24, 24,  3, 14] ADD ONLY
// [ ?, 18,  4, 15, 17,  8,  1,  2,  2, 23, 12] SUBTRACT ONLY