import { encryptedK4, ratePossibleK4Solution } from "../k4";
import { allCharCombinations } from "../lib/combinations";
import { skipTest } from "../lib/skip-test";
import { generateAlphabet, standardAlphabet, vigDecrypt } from "../lib/vigenere";

// It takes about 17 seconds to test a million combinations on my MacBook.
// There are 8,031,810,176 possible seven letter words.
// So it would take 37 hours just to test all seven letter words.
// PALIMPSEST is 10 letters and ABSCISSA is 8.
// It's not achievable in my lifetime to test all combinations up to that
//  length, in TypeScript, on my MacBook.
// Maybe if I rewrite in Rust?
// And even then, there might not be a Vigenere cipher, or the skip tester
//  might not find the solution, or there might be some new twist on the
//  Vigenere table.
const bruteForceGenerator = allCharCombinations(standardAlphabet, 1, 7);
let attempt: string | void;
let counter = 0;
let startTime = performance.now();
while (attempt = bruteForceGenerator.next().value) {
  if (!attempt) {
    break;
  }
  counter++;
  if (counter % 1_000_000 === 0) {
    console.log({counter, elapsedTime: performance.now() - startTime});
  }

  attemptVigDecryptAndSkip(attempt, 'KRYPTOS');
}

function attemptVigDecryptAndSkip(key: string, alphabetPrefix: string, showCandidates: boolean = false): number {
  const attempt = vigDecrypt(encryptedK4, key, generateAlphabet(alphabetPrefix));
  const rating = ratePossibleK4Solution(attempt);
  
  if (rating >= 2) {
    if (showCandidates) {
      console.log(rating, key);
      console.log(attempt);
    }

    skipTest(attempt, 'BERL');
    skipTest(attempt, 'NORT');
  }
  
  return rating;
}
