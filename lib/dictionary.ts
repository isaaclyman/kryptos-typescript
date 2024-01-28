import fs from 'node:fs';

export const allWords = fs
  .readFileSync('assets/words_alpha.txt', 'utf8')
  .split('\r\n')
  .map(word => word.toUpperCase());
