// Index of coincidence measures the non-randomness of a text.
// A value close to 0.038 is random, thus more likely encrypted using something
//  like a Vigenere cypher. A value close to 0.067 is the average IC of English, 
//  thus more likely encrypted using transposition or a mono substitution cipher.

import { standardAlphabet } from "./vigenere";

export function getCoincidence(text: string): number {
  const textChars = text.split('');

  let runningProbability = 0;
  for (const letter of standardAlphabet) {
    const occurrences = textChars.filter(char => char === letter).length;
    const proportion = occurrences / text.length;
    const repeatProportion = (occurrences - 1) / (text.length - 1);
    const doubleSelectionProbability = proportion * repeatProportion;
    runningProbability += doubleSelectionProbability;
  }

  return runningProbability;
}