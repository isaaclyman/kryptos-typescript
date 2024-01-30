import { chunk } from './array';
import { Matrix } from './matrix';
const math = require('mathjs');

export function isValidHillKey(key: number[][]): boolean {
  return math.det(key) !== 0;
}

export function hillEncrypt(
  message: string,
  key: number[][],
  alphabet: string
): string {
  if (!isValidHillKey(key)) {
    throw new Error('Invalid key; determinant is 0.');
  }

  const simultaneousCharacters = key.length;
  const messageChars = message.split('');
  const messageChunks = chunk(messageChars, simultaneousCharacters);

  const encrypted: string[] = [];
  for (const chunk of messageChunks) {
    const numericChunk = chunk.map((char) => alphabet.indexOf(char));
    const matrix = numericChunk.map((num) => [num]);
    const multiplied = math.multiply(key, matrix);
    const encryptedChunk = multiplied.flat();
    const encryptedChars = encryptedChunk.map(
      (num) => alphabet[num % alphabet.length]
    );
    encrypted.push(...encryptedChars);
  }

  return encrypted.join('');
}

export function hillDecrypt(
  message: string,
  key: number[][],
  alphabet: string
): string {
  if (!isValidHillKey(key)) {
    throw new Error('Invalid key; determinant is 0.');
  }

  const simultaneousCharacters = key.length;
  const messageChars = message.split('');
  const messageChunks = chunk(messageChars, simultaneousCharacters);
  const invertedKey = math.mod(
    calculateInverseKeyMatrix(key, alphabet.length),
    alphabet.length
  );

  const encrypted: string[] = [];
  for (const chunk of messageChunks) {
    const numericChunk = chunk.map((char) => alphabet.indexOf(char));
    const matrix = numericChunk.map((num) => [num]);
    const encryptedChunk = math.multiply(invertedKey, matrix);
    const encryptedChars = encryptedChunk.map(
      (num) => alphabet[num % alphabet.length]
    );
    encrypted.push(...encryptedChars);
  }

  return encrypted.join('');
}

function calculateInverseKeyMatrix(key: number[][], mod: number): number[][] {
  const determinant = math.det(key);
  const inverseDeterminant = calculateInverseDeterminant(determinant, mod);
  const adjugateMatrix = calculateAdjugateMatrix(key);
  const inverseKeyMatrix = math.multiply(adjugateMatrix, inverseDeterminant);
  return inverseKeyMatrix;
}

function calculateInverseDeterminant(determinant: number, mod: number): number {
  for (let i = 1; i < mod; i++) {
    if ((determinant * i) % mod === 1) {
      return i;
    }
  }
  throw new Error('Inverse determinant does not exist.');
}

function calculateAdjugateMatrix(matrix: number[][]): number[][] {
  return new Matrix(...matrix).adjugate().rows;
}
