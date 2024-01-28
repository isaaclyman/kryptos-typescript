import { encryptedK4, ratePossibleK4Solution } from '../k4';
import { getCoincidence, hasHighCoincidence } from '../lib/coincidence';
import { allWords } from '../lib/dictionary';
import { skipTest } from '../lib/skip';
import { vigDecrypt, generateAlphabet, vigEncrypt } from '../lib/vigenere';

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
// None of them have a coincidence at or above 0.06.
// The words with a relatively "high" coincidence (above 0.052) are:
// AISSOR (encrypting), BIRDBRAINS (decrypting), BIRDLIMING (decrypting),
// HELLIM (encrypting), NULLUM (encrypting)

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

function validate(attempt: string, method: string, key: string, showCandidates: boolean = false): number {
  const rating = ratePossibleK4Solution(attempt);

  if (rating > 2) {
    console.log('--ALERT--');
    console.log(rating, key);
    console.log('--ALERT--');
  }

  if (rating >= 2) {
    if (showCandidates) {
      console.log(rating, key);
      console.log(attempt);
    }

    if (hasHighCoincidence(attempt)) {
      const coincidence = getCoincidence(attempt);
      console.log([coincidence, method, key, attempt]);

      const match1 = skipTest(attempt, 'BERLIN');
      const match2 = skipTest(attempt, 'EASTNO');

      if (match1 || match2) {
        if (match1 && match1.result.length % match1.skip === 0) {
          console.log('DUPLICATES LIKELY');
        }
        if (match2 && match2.result.length % match2.skip === 0) {
          console.log('DUPLICATES LIKELY');
        }
        console.log(['KEY', key, method]);
        console.log([match1, match2]);
      }
    }
  }

  return rating;
}