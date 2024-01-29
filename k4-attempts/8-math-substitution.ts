import { encryptedK4, ratePossibleK4Solution } from '../k4';
import { getCoincidence } from '../lib/coincidence';
import {
  addSimpleMathKey,
  subtractSimpleMathKey,
} from '../lib/math-substitution';
import { generateAlphabet, standardAlphabet } from '../lib/vigenere';

const countingSet = Array(100).fill(null).map((_, ix) => ix + 1);
messageForwardAndReverse(encryptedK4, countingSet, 'countingSet');

const naturalSet = [0, ...countingSet];
messageForwardAndReverse(encryptedK4, naturalSet, 'naturalSet');

const berlinClock1 = [
  5, 10, 15, 20, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 1, 2, 3,
  4,
];
messageForwardAndReverse(encryptedK4, berlinClock1, 'berlinClock1');

const berlinClock2 = [1, ...berlinClock1];
messageForwardAndReverse(encryptedK4, berlinClock2, 'berlinClock2');

const berlinClock3 = [4, 4, 11, 4];
messageForwardAndReverse(encryptedK4, berlinClock3, 'berlinClock3');

const berlinClock4 = [1, ...berlinClock3];
messageForwardAndReverse(encryptedK4, berlinClock4, 'berlinClock4');

const powersOfFive = countingSet.map(val => 5 ** (val % 24));
messageForwardAndReverse(encryptedK4, powersOfFive, 'powersOfFive');

const powersOfFive2 = naturalSet.map(val => 5 ** (val % 24));
messageForwardAndReverse(encryptedK4, powersOfFive2, 'powersOfFive2');

function messageForwardAndReverse(
  message: string,
  key: number[],
  description: string
) {
  const forward = message;
  const reverse = message.split('').reverse().join('');
  bothAlphabets(forward, key, `${description} | forward`);
  bothAlphabets(reverse, key, `${description} | reverse`);
}

function bothAlphabets(message: string, key: number[], description: string) {
  const kryptosAlphabet = generateAlphabet('KRYPTOS');
  bothSimpleMathVariants(
    message,
    key,
    standardAlphabet,
    `${description} | standardAZ`
  );
  bothSimpleMathVariants(
    message,
    key,
    kryptosAlphabet,
    `${description} | kryptosAZ`
  );
}

function bothSimpleMathVariants(
  message: string,
  key: number[],
  alphabet: string,
  description: string
) {
  const added = addSimpleMathKey(message, key, alphabet);
  validate(added, `${description} | added`);
  const subtracted = subtractSimpleMathKey(message, key, alphabet);
  validate(subtracted, `${description} | subtracted`);
}

function validate(result: string, description: string) {
  const rating = ratePossibleK4Solution(result);
  if (rating > 2) {
    console.log({ description, rating, result });
  }

  const coincidence = getCoincidence(result);
  if (coincidence > 0.06) {
    console.log({ description, coincidence, result });
  }
}
