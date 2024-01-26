import { chunk } from "./array";

export function columnarEncrypt(message: string, key: string): string {
  // First, sort the key and get the alphabetical position number of each character
  const keyChars = key.split('');
  const sortedKey = keyChars.toSorted();
  const positionNumbers = keyChars.map(char => sortedKey.indexOf(char));

  // Then break the message into rows the same length as the key
  const messageChars = message.split('');
  const messageRows = chunk(messageChars, keyChars.length);

  // Create a two-dimensional array with the same number of rows
  //  as the message and the same number of columns as the key
  const encryptedRows: (string | null)[][] = Array(messageRows.length)
    .fill(null)
    .map(_ => Array(key.length).fill(null).map(_ => null));

  // For each column of the to-be-encrypted message...
  for (const orderedColumnIx in keyChars) {
    // Find out what column its characters are currently in
    const messageColumnIx = positionNumbers.indexOf(Number(orderedColumnIx));
    
    // And put them in order
    for (const rowIx in messageRows) {
      encryptedRows[rowIx][orderedColumnIx] = messageRows[rowIx][messageColumnIx] ?? null;
    }
  }

  // Finally, read out the encrypted message a column at a time
  let encrypted = '';
  for (let ix = 0; ix < key.length; ix++) {
    for (const row of encryptedRows) {
      if (row[ix] === null) {
        continue;
      }

      encrypted += row[ix];
    }
  }
  return encrypted;
}

export function columnarDecrypt(encrypted: string, key: string): string {
  // Again, sort the key and get position numbers
  const keyChars = key.split('');
  const sortedKey = keyChars.toSorted();
  const positionNumbers = keyChars.map(char => sortedKey.indexOf(char));

  // Figure out how many rows are needed
  const numberOfRows = Math.ceil(encrypted.length / key.length);
  
  // And how many empty cells there will be
  const numberOfEmpties = (numberOfRows * key.length) % encrypted.length;

  // Create a two-dimensional array with the correct number of rows
  //  and the same number of columns as the key
  const messageRows = Array(numberOfRows)
    .fill(null)
    .map(row => Array(key.length).fill(null));

  // Work backwards to fill in the number of empty cells on the last row
  const lastRow = messageRows[messageRows.length - 1];
  for (let emptyIx = 1; emptyIx <= numberOfEmpties; emptyIx++) {
    lastRow[lastRow.length - emptyIx] = '';
  }

  // Then, starting with column 0...
  let orderedColumnIx = 0;
  // For each character in the encrypted message...
  for (const encryptedChar of encrypted) {
    // Find out the position number of the current column
    const messageColumnIx = positionNumbers.indexOf(orderedColumnIx);

    // Put the current character in the first available row of that column
    const availableRowIx = messageRows.findIndex(row => row[messageColumnIx] === null);
    const availableRow = messageRows[availableRowIx];
    availableRow[messageColumnIx] = encryptedChar;
    
    // If all rows are full, increment the column
    if (messageRows.every(row => row[messageColumnIx] !== null)) {
      orderedColumnIx++;
    }
  }

  // Finally, flatten and join the decrypted message
  return messageRows.flat().join('');
}