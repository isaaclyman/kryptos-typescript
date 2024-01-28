import { encryptedK4, ratePossibleK4Solution } from '../k4';
import { cDecrypt } from '../lib/caesar';
import { allWords } from '../lib/dictionary';
import { skipTest } from '../lib/skip';
import { generateAlphabet } from '../lib/vigenere';

console.log('STARTING WORDS', allWords.length);

let counter1 = 0;
let counter2 = 0;
for (let key = -26; key <= 26; key++) {
  const rating1 = attemptCaesarDecryptAndSkip(key, 'KRYPTOS');
  if (rating1 > 2) {
    console.log(rating1, `CAESAR | ${key}`);
  }

  if (rating1 >= 2) {
    counter1++;
  }

  const rating2 = attemptCaesarDecryptAndSkip(key, '');
  if (rating2 > 2) {
    console.log(rating2, `CAESAR | ${key}`);
  }

  if (rating2 >= 2) {
    counter2++;
  }
}

console.log('TOTAL CANDIDATES (KRYPTOS)', counter1);
console.log('TOTAL CANDIDATES (STANDARD)', counter2);

// No particularly interesting candidates here

function attemptCaesarDecryptAndSkip(key: number, alphabetPrefix: string, showCandidates: boolean = false): number {
  const attempt = cDecrypt(encryptedK4, key, generateAlphabet(alphabetPrefix));
  const rating = ratePossibleK4Solution(attempt);
  
  if (rating >= 2) {
    if (showCandidates) {
      console.log(rating, key);
      console.log(attempt);
    }

    const match1 = skipTest(attempt, 'BERL');
    const match2 = skipTest(attempt, 'NORT');

    if (match1 || match2) {
      console.log('KEY', key);
      console.log(match1, match2);
    }
  }
  
  return rating;
}
