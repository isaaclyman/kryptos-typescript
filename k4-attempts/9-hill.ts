import { encryptedK4 } from "../k4";
import { generateAlphabet, lettersToNumbers, standardAlphabet } from "../lib/alphabet";
import { chunk } from "../lib/array";
import { getCoincidence } from "../lib/coincidence";
import { hillDecrypt } from "../lib/hill";

const berlinKey1 = chunk(lettersToNumbers('BERLINUHR', generateAlphabet('KRYPTOS')), 3);
const berlinKey1Result = hillDecrypt(encryptedK4 + 'XX', berlinKey1, standardAlphabet);
console.log({berlinKey1, result: berlinKey1Result, c: getCoincidence(berlinKey1Result)});

// It's actually pretty hard to make up a matrix with a non-zero determinant, apparently