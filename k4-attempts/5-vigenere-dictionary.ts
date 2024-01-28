import { encryptedK4, ratePossibleK4Solution } from '../k4';
import { allWords } from '../lib/dictionary';
import { skipTest } from '../lib/skip-test';
import { vigDecrypt, generateAlphabet } from '../lib/vigenere';

console.log('STARTING WORDS', allWords.length);

let counter1 = 0;
let counter2 = 0;
for (const attempt of allWords) {
  const rating1 = attemptVigDecryptAndSkip(attempt, 'KRYPTOS');
  if (rating1 > 2) {
    console.log(rating1, attempt);
  }

  if (rating1 >= 2) {
    counter1++;
  }

  const rating2 = attemptVigDecryptAndSkip(attempt, '');
  if (rating2 > 2) {
    console.log(rating2, attempt);
  }

  if (rating2 >= 2) {
    counter2++;
  }
}

console.log('TOTAL CANDIDATES (KRYPTOS)', counter1);
console.log('TOTAL CANDIDATES (STANDARD)', counter2);

// This gives 75,000 English words that, after Vigenere cipher, have all the letters
//  necessary to form the phrases 'EASTNORTHEAST' and 'BERLINCLOCK'. Should probably
//  also test letter frequency for "englishness" to try and whittle them down.

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
