export function cEncrypt(message: string, key: number, alphabet: string): string {
  const messageChars = message.toUpperCase().split('');

  // For each character in the message...
  const encryptedChars = messageChars.map((messageChar) => {
    if (!alphabet.includes(messageChar)) {
      return messageChar;
    }

    // Get its "a=0" number
    const charIx = alphabet.indexOf(messageChar);
    // Add the key and modulo 26
    const added = (charIx + key) % 26;
    // Handle negative numbers
    const encryptedIx = added < 0 ? added + 26 : added;
    // Find the new letter
    const encryptedChar = alphabet[encryptedIx];
    return encryptedChar;
  });

  // Join all the encrypted characters together into one message
  return encryptedChars.join('');
}

export function cDecrypt(encrypted: string, key: number, alphabet: string): string {
  const encryptedChars = encrypted.toUpperCase().split('');

  // For each encrypted character...
  const messageChars = encryptedChars.map((encryptedChar) => {
    if (!alphabet.includes(encryptedChar)) {
      return encryptedChar;
    }

    // Get its "a=0" number
    const charIx = alphabet.indexOf(encryptedChar);
    // Subtract the key and modulo 26
    const subtracted = (charIx - key) % 26;
    // Handle negative numbers
    const messageIx = subtracted < 0 ? subtracted + 26 : subtracted;
    // Find the new letter
    const messageChar = alphabet[messageIx];
    return messageChar;
  });

  // Join all the encrypted characters together into one message
  return messageChars.join('');
}
