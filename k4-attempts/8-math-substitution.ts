import { encryptedK4, ratePossibleK4Solution } from '../k4';
import { getCoincidence } from '../lib/coincidence';
import {
  addSimpleMathKey,
  subtractSimpleMathKey,
} from '../lib/math-substitution';
import { generateAlphabet, standardAlphabet } from '../lib/vigenere';

const k4length = encryptedK4.length;

const countingSet = Array(k4length).fill(null).map((_, ix) => ix + 1);
tryAllKeyArrangements(encryptedK4, countingSet, 'countingSet');

const naturalSet = [0, ...countingSet];
tryAllKeyArrangements(encryptedK4, naturalSet, 'naturalSet');

const berlinClock1 = [
  5, 10, 15, 20, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 1, 2, 3,
  4,
];
tryAllKeyArrangements(encryptedK4, berlinClock1, 'berlinClock1');

const berlinClock2 = [1, ...berlinClock1];
tryAllKeyArrangements(encryptedK4, berlinClock2, 'berlinClock2');

const berlinClock3 = [4, 4, 11, 4];
tryAllKeyArrangements(encryptedK4, berlinClock3, 'berlinClock3');

const berlinClock4 = [1, ...berlinClock3];
tryAllKeyArrangements(encryptedK4, berlinClock4, 'berlinClock4');

const berlinClock5 = [1, 2, 3, 4];
tryAllKeyArrangements(encryptedK4, berlinClock5, 'berlinClock5');

const berlinClock6 = [0, ...berlinClock5];
tryAllKeyArrangements(encryptedK4, berlinClock6, 'berlinClock6');

const berlinClock7 = [1, 2, 3, 4, 5];
tryAllKeyArrangements(encryptedK4, berlinClock7, 'berlinClock7');

const powersOfFive = countingSet.map(val => 5 ** (val % 5));
tryAllKeyArrangements(encryptedK4, powersOfFive, 'powersOfFive');

const powersOfFive2 = naturalSet.map(val => 5 ** (val % 5));
tryAllKeyArrangements(encryptedK4, powersOfFive2, 'powersOfFive2');

const powersOfFive3 = naturalSet.map(val => (val % 5) ** 5);
tryAllKeyArrangements(encryptedK4, powersOfFive3, 'powersOfFive3');

for (let multiple = 2; multiple <= 24; multiple++) {
  const multiplesSet1 = countingSet.map(val => val * multiple);
  tryAllKeyArrangements(encryptedK4, multiplesSet1, 'multiplesOf' + multiple + 'Counting')
  const multiplesSet2 = naturalSet.map(val => val * multiple);
  tryAllKeyArrangements(encryptedK4, multiplesSet2, 'multiplesOf' + multiple + 'Natural')

}

function tryAllKeyArrangements(message: string, key: number[], description: string) {
  for (let increment = 0; increment < key.length; increment++) {
    const newKey = key.map((_, ix) => key[((ix + increment) % key.length)]);
    messageForwardAndReverse(message, newKey, description);
  }
}

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
  validate(added, key, `${description} | added`);
  const subtracted = subtractSimpleMathKey(message, key, alphabet);
  validate(subtracted, key, `${description} | subtracted`);
}

function validate(result: string, key: number[], description: string) {
  const rating = ratePossibleK4Solution(result);
  if (rating > 2) {
    console.log({ description, key, rating, result });
  }

  const coincidence = getCoincidence(result);
  if (coincidence > 0.06) {
    console.log({ description, key, coincidence, result });
  }
}
