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

const key2 = vigDecrypt('EASTNORTHEAST', 'FLRVQQPRNGKSS', generateAlphabet(''));
console.log({key2, coincidence: getCoincidence(key2)});
// ZPBYXYCCUYQAB, c=0.0641025641025641

// NYPVTTMZFPK + ? = BERLINCLOCK
// BERLINCLOCK - NYPVTTMZFPK = ?
const key3 = vigDecrypt('BERLINCLOCK', 'NYPVTTMZFPK', generateAlphabet('KRYPTOS'));
console.log({key3, coincidence: getCoincidence(key3)});
// ICXUEILMNSK, c=0.018181818181818184

const key4 = vigDecrypt('BERLINCLOCK', 'NYPVTTMZFPK', generateAlphabet(''));
console.log({key4, coincidence: getCoincidence(key4)});
// OGCQPUQMJNA, c=0.018181818181818184