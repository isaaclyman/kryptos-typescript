import { encryptedK4 } from "../k4";
import { generateAlphabet, lettersToNumbers, standardAlphabet } from "../lib/alphabet";
import { chunk } from "../lib/array";
import { getCoincidence } from "../lib/coincidence";
import { hillDecrypt } from "../lib/hill";

const kAlpha = generateAlphabet('KRYPTOS');

const berlinKey1 = chunk(lettersToNumbers('BERLINUHR', kAlpha), 3);
const berlinKey1Result = hillDecrypt(encryptedK4 + 'XX', berlinKey1, standardAlphabet);
console.log({berlinKey1, result: berlinKey1Result, c: getCoincidence(berlinKey1Result)});

// As written:
// ZDPLMFPQNJXUVAPTLYSHOCEXNUJYIVGESSJJRLZLVLYEQVSIIZVPFQHJVKUMGWJRFEKIJPCANYLTXRMYDXLQMSAHNDYKKEOGYCL
// c=0.037

// Reverse the key:
// VXTDBATXWODPPNIUPXCGRFWUXTMLSIAWYBENVPVBFVYWQSVYTOXAVFNRPAGWBEOOVHZSUELYHPELDZZCQMPBKICDNHEQEIMCPYU
// c=0.036

// It's actually pretty hard to make up a matrix with a non-zero determinant, apparently.
// I have yet to find another valid key based on any clues.
