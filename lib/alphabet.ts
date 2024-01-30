export const standardAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function generateAlphabet(prefix: string): string {
  return prefix + standardAlphabet.split('').filter(ch => !prefix.includes(ch)).join('');
}

export function lettersToNumbers(text: string, alphabet: string): number[] {
  return text.split('').map(char => alphabet.indexOf(char));
}