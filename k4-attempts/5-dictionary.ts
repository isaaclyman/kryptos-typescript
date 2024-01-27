import fs from 'node:fs';
import { attemptVigDecryptAndSkip } from '../lib/vigenere-skip';

const allWords = fs.readFileSync('assets/words_alpha.txt', 'utf8').split('\n');
let counter = 0;
for (const attempt of allWords) {
  const rating = attemptVigDecryptAndSkip(attempt.toUpperCase(), 'KRYPTOS');
  if (rating > 2) {
    console.log(rating, attempt);
  }

  if (rating >= 2) {
    counter++;
  }
}

console.log('TOTAL CANDIDATES', counter);

// This gives 75,000 English words that, after Vigenere cipher, have all the letters
//  necessary to form the phrases 'EASTNORTHEAST' and 'BERLINCLOCK'. Should probably
//  also test letter frequency for "englishness" to try and whittle them down.