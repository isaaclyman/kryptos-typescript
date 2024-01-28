// Answering the question, what Vignere key translates:
// FLRVQQPRNGKSS > EASTNORTHEAST
// NYPVTTMZFPK > BERLINCLOCK

import { getCoincidence } from "../lib/coincidence";
import { generateAlphabet, vigDecrypt } from "../lib/vigenere";

// FLRVQQPRNGKSS + ? = EASTNORTHEAST
// EASTNORTHEAST - FLRVQQPRNGKSS = ?
const key1 = vigDecrypt('EASTNORTHEAST', 'FLRVQQPRNGKSS', generateAlphabet('KRYPTOS'));
console.log({key1, coincidence: getCoincidence(key1)});
// ZJOBZEXPUXAKX, c=0.05128205128205128

// NYPVTTMZFPK + ? = BERLINCLOCK
// BERLINCLOCK - NYPVTTMZFPK = ?
const key2 = vigDecrypt('BERLINCLOCK', 'NYPVTTMZFPK', generateAlphabet('KRYPTOS'));
console.log({key2, coincidence: getCoincidence(key2)});
// ICXUEILMNSK, c=0.018181818181818184