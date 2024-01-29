export function addSimpleMathKey(
  message: string,
  key: number[],
  alphabet: string
): string {
  return message
    .replace(/[^a-zA-Z]/g, '')
    .split('')
    .map((char, charIx) => {
      const charAlphaIx = alphabet.indexOf(char);
      const keyIx = charIx % key.length;
      const keyValue = key[keyIx];
      const encryptedAlphaIx = (charAlphaIx + keyValue) % alphabet.length;
      return alphabet[encryptedAlphaIx];
    })
    .join('');
}

export function subtractSimpleMathKey(
  message: string,
  key: number[],
  alphabet: string
): string {
  return message
    .replace(/[^a-zA-Z]/g, '')
    .split('')
    .map((char, charIx) => {
      const charAlphaIx = alphabet.indexOf(char);
      const keyIx = charIx % key.length;
      const keyValue = key[keyIx];
      const encryptedAlphaIx = (charAlphaIx - keyValue) % alphabet.length;
      return encryptedAlphaIx >= 0
        ? alphabet[encryptedAlphaIx]
        : alphabet[encryptedAlphaIx + alphabet.length];
    })
    .join('');
}
