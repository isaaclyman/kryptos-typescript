export function vigEncrypt(message: string, key: string, alphabet: string): string {
  const messageChars = message.toUpperCase().split('');

  // For each character in the message...
  let messageIx = 0;
  const encryptedChars = messageChars.map((messageChar) => {
    // Traditionally you'd remove spaces and symbols before encrypting to
    //  make it harder to crack, but you don't have to.
    if (!alphabet.includes(messageChar)) {
      return messageChar;
    }

    // Find the same index in the key, looping around if needed
    const keyIx = messageIx % key.length;
    messageIx++;
    // Get the character at that index
    const keyChar = key[keyIx];
    // Find its "a=0" number
    const keyNumber = alphabet.indexOf(keyChar);
    // Find the "a=0" number of the original message character as well
    const messageNumber = alphabet.indexOf(messageChar);
    // Add the numbers together, looping around if >26
    const encryptedNumber = (messageNumber + keyNumber) % 26;
    // Get the letter corresponding to that number
    const encryptedChar = alphabet[encryptedNumber];
    // That's our encrypted character!
    return encryptedChar;
  });

  // Join all the encrypted characters together into one message
  return encryptedChars.join('');
}

export function vigDecrypt(encrypted: string, key: string, alphabet: string): string {
  const encryptedChars = encrypted.toUpperCase().split('');

  // Now we simply reverse what we did above
  let encryptedIx = 0;
  const messageChars = encryptedChars.map((encryptedChar) => {
    if (!alphabet.includes(encryptedChar)) {
      return encryptedChar;
    }

    const keyIx = encryptedIx % key.length;
    encryptedIx++;
    const keyChar = key[keyIx];
    const keyNumber = alphabet.indexOf(keyChar);
    const encryptedNumber = alphabet.indexOf(encryptedChar);
    
    let messageNumber = encryptedNumber - keyNumber;
    // Special handling for negative numbers...
    if (messageNumber < 0) {
      messageNumber = alphabet.length + messageNumber;
    }

    const messageChar = alphabet[messageNumber];
    return messageChar;
  });

  // Join all the decrypted characters together into one message
  return messageChars.join('');
}
