import { encryptedK4 } from '../k4';
import { cDecrypt } from '../lib/caesar';
import { allWords } from '../lib/dictionary';
import { validate } from '../lib/validate';
import { generateAlphabet } from '../lib/vigenere';

console.log('STARTING WORDS', allWords.length);

let counter1 = 0;
let counter2 = 0;
for (let key = 0; key <= 26; key++) {
  const rating1 = attemptCaesarDecryptAndValidate(key, 'KRYPTOS');
  if (rating1 >= 2) {
    counter1++;
  }

  const rating2 = attemptCaesarDecryptAndValidate(key, '');
  if (rating2 >= 2) {
    counter2++;
  }
}

console.log('TOTAL CANDIDATES (KRYPTOS)', counter1);
console.log('TOTAL CANDIDATES (STANDARD)', counter2);

// No particularly interesting candidates here

function attemptCaesarDecryptAndValidate(key: number, alphabetPrefix: string, showCandidates: boolean = false): number {
  const attempt = cDecrypt(encryptedK4, key, generateAlphabet(alphabetPrefix));
  return validate(attempt, 'cDecrypt', key.toString(), showCandidates);
}
