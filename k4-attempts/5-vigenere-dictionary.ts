import { encryptedK4 } from '../k4';
import { generateAlphabet } from '../lib/alphabet';
import { allWords } from '../lib/dictionary';
import { validate } from '../lib/validate';
import { vigDecrypt, vigEncrypt } from '../lib/vigenere';

console.log('STARTING WORDS', allWords.length);

let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;
for (const attempt of allWords) {
  const rating1 = attemptVigDecryptAndValidate(attempt, 'KRYPTOS');
  if (rating1 >= 2) {
    counter1++;
  }

  const rating2 = attemptVigDecryptAndValidate(attempt, '');
  if (rating2 >= 2) {
    counter2++;
  }

  const rating3 = attemptVigEncryptAndValidate(attempt, 'KRYPTOS');
  if (rating3 >= 2) {
    counter3++
  }

  const rating4 = attemptVigEncryptAndValidate(attempt, '');
  if (rating4 >= 2) {
    counter4++;
  }
}

console.log('TOTAL CANDIDATES (KRYPTOS)', counter1);
console.log('TOTAL CANDIDATES (STANDARD)', counter2);
console.log('TOTAL CANDIDATES (KRYPTOS, REVERSED)', counter3);
console.log('TOTAL CANDIDATES (STANDARD, REVERSED)', counter4);

// This gives between 75,000 and 112,600 English words that, after Vigenere cipher, have all the letters
//  necessary to form the phrases 'EASTNORTHEAST' and 'BERLINCLOCK'.
// None of them have a coincidence at or above 0.06, which is expected for English-like text.
// The two words with a relatively "high" coincidence (above 0.052) are:
// BOWWOOD (encrypting), WIZARDLIKE (decrypting)

function attemptVigDecryptAndValidate(
  key: string,
  alphabetPrefix: string,
  showCandidates: boolean = false
): number {
  const attempt = vigDecrypt(
    encryptedK4,
    key,
    generateAlphabet(alphabetPrefix)
  );
  return validate(attempt, key, 'vigDecrypt', showCandidates);
}

function attemptVigEncryptAndValidate(
  key: string,
  alphabetPrefix: string,
  showCandidates: boolean = false
): number {
  const attempt = vigEncrypt(
    encryptedK4,
    key,
    generateAlphabet(alphabetPrefix)
  );
  return validate(attempt, key, 'vigEncrypt', showCandidates);
}
