export const standardAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function generateAlphabet(prefix: string): string {
  return prefix + standardAlphabet.split('').filter(ch => !prefix.includes(ch)).join('');
}
