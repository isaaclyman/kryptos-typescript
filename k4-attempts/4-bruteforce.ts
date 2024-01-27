import { allCharCombinations } from "../lib/combinations";
import { standardAlphabet } from "../lib/vigenere";
import { attemptVigDecryptAndSkip } from "../lib/vigenere-skip";

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
