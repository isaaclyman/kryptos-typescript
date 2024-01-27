import { encryptedK4, ratePossibleK4Solution } from "../k4";
import { allCharCombinations } from "../lib/combinations";
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

function attemptVigDecryptAndSkip(key: string, alphabetPrefix: string) {
  const attempt = vigDecrypt(encryptedK4, key, generateAlphabet(alphabetPrefix));
  const rating = ratePossibleK4Solution(attempt);
  
  const lettersToValidate = ['B','E','R','L'];
  const locations: number[][] = [];
  if (rating >= 2) {
    for (const letter of lettersToValidate) {
      const letterLocations = attempt.split('').reduce((locs, char, ix) => {
        if (char === letter) {
          locs.push(ix);
        }
        return locs;
      }, []);
      locations.push(letterLocations);
    }
  
    const messageLength = attempt.length;
  
    for (const startingPoint of locations[0]) {
      // Not all transpositions would have a repeated skip solution like K3, but it's worth a shot
      for (let skipAttempt = 1; skipAttempt < 500; skipAttempt++) {
        const skipped = (startingPoint + skipAttempt) % messageLength;
    
        let candidatesMatched = [];
        for (const candidates of locations.slice(1)) {
          if (!candidates.includes(skipped)) {
            candidatesMatched = [];
            break;
          }
    
          candidatesMatched.push(skipped);
        }
        
        if (candidatesMatched.length) {
          console.log({skipAttempt, candidatesMatched});
        }
      }
    }
  }    
}
