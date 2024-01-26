import { chunk } from "./array";

export function columnarEncryptLines(stackedLines: string[], key: string): string[] {
  const keyChars = key.split('');
  const sortedKey = keyChars.toSorted();
  const positionNumbers = keyChars.map(char => sortedKey.indexOf(char));

  const encryptedRows: (string | null)[][] = Array(stackedLines.length)
    .fill(null)
    .map(_ => Array(key.length).fill(null).map(_ => null));

  for (const orderedColumnIx in keyChars) {
    const messageColumnIx = positionNumbers.indexOf(Number(orderedColumnIx));
    
    for (const rowIx in stackedLines) {
      encryptedRows[rowIx][orderedColumnIx] = stackedLines[rowIx][messageColumnIx] ?? ' ';
    }
  }

  return encryptedRows.map(row => row.join(''));
}

export function columnarDecryptLines(stackedLines: string[], key: string): string[] {
  const keyChars = key.split('');
  const sortedKey = keyChars.toSorted();
  const positionNumbers = keyChars.map(char => sortedKey.indexOf(char));

  const encryptedRows: (string | null)[][] = Array(stackedLines.length)
    .fill(null)
    .map(_ => Array(key.length).fill(null).map(_ => null));

  for (const messageColumnIx in keyChars) {
    const orderedColumnIx = positionNumbers.indexOf(Number(messageColumnIx));
    
    for (const rowIx in stackedLines) {
      encryptedRows[rowIx][orderedColumnIx] = stackedLines[rowIx][messageColumnIx] ?? ' ';
    }
  }

  return encryptedRows.map(row => row.join(''));
}

export function routeEncryptArrange(message: string, rectangleSize: number, blockSize: number): string[] {
  const messageChars = message.split('');
  const messageLines = chunk(messageChars, rectangleSize);
  const chunkedLines = messageLines.map(line => chunk(line, blockSize));

  const allChunks = chunkedLines.flat();
  const finalChunk = allChunks.pop();
  const mainChunkSizes = allChunks.map(chunk => chunk.length);
  const oddChunkSize = mainChunkSizes.find(chunkSize => chunkSize !== blockSize);

  if (
    typeof oddChunkSize === 'number' &&
    Array.isArray(finalChunk) &&
    finalChunk.length !== oddChunkSize &&
    finalChunk.length !== blockSize
  ) {
    if (finalChunk.length < oddChunkSize) {
      finalChunk.push(...'Q'.repeat(oddChunkSize - finalChunk.length));
    } else {
      finalChunk.push(...'Q'.repeat(blockSize - finalChunk.length));
    }
  }

  const stackedLines: string[][] = [];
  
  const blocksPerLine = Math.ceil(rectangleSize / blockSize);
  for (let blockIx = 0; blockIx < blocksPerLine; blockIx++) {
    const numberOfRows = chunkedLines.length;
    for (let rowIx = 0; rowIx < numberOfRows; rowIx++) {
      const encryptedRowIx = rowIx + (blockIx * numberOfRows);
      stackedLines[encryptedRowIx] = chunkedLines[rowIx][blockIx];
    }
  }

  return stackedLines.filter(line => Array.isArray(line)).map(line => line.join(''));
}

export function routeEncryptReadOut(stackedLines: string[], blockSize: number): string {
  const encryptedChars: string[] = [];
  for (let charIx = 0; charIx < blockSize; charIx++) {
    for (let rowIx = 0; rowIx < stackedLines.length; rowIx++) {
      if (typeof stackedLines[rowIx] !== 'string') {
        continue;
      }

      const char = stackedLines[rowIx][charIx];
      if (typeof char === 'string' && char !== ' ') {
        encryptedChars.push(char);
      }
    }
  }
  
  return encryptedChars.join('');
}

export function routeDecryptReadIn(encrypted: string, rectangleSize: number, key: string): string[] {
  const numberOfRows = Math.ceil(encrypted.length / rectangleSize);
  const blockSize = key.length;
  const chunksPerRow = Math.ceil(rectangleSize / blockSize);
  const lastRowLength = encrypted.length % rectangleSize;
  const lastRowChunks = Math.ceil(lastRowLength / blockSize);
  const totalChunks = (chunksPerRow * (numberOfRows - 1)) + lastRowChunks;

  const lastChunkSize = (lastRowLength % blockSize) || blockSize;
  const oddChunkSize = rectangleSize % blockSize;
  
  let numberOfShortVLines: number;
  if (oddChunkSize !== blockSize) {
    numberOfShortVLines = blockSize - oddChunkSize;
  } else if (lastChunkSize !== blockSize) {
    numberOfShortVLines = blockSize - lastChunkSize;
  } else {
    numberOfShortVLines = 0;
  }
  
  const numberOfLongVLines = blockSize - numberOfShortVLines;

  const longVLineLength = totalChunks;
  const shortVLineLength = totalChunks -
    ((oddChunkSize !== blockSize ? numberOfRows - 1 : 0) +
     (lastChunkSize !== blockSize ? 1 : 0));

  const stackedLines: string[][] = [];
  let encryptedIx = 0;

  // New code to inspect the key so we can detect long vs.
  //  short lines.
  const keyChars = key.split('');
  const sortedKey = keyChars.toSorted();
  const positionNumbers = keyChars.map(char => sortedKey.indexOf(char));

  for (let vLineIx = 0; vLineIx < blockSize; vLineIx++) {
    const transposedVLineIx = positionNumbers.indexOf(vLineIx);
    const currentVLineLength = transposedVLineIx < numberOfLongVLines ?
      longVLineLength :
      shortVLineLength;

    // Updated to add spaces in the empty spots on a short line
    for (let rowIx = 0; rowIx < longVLineLength; rowIx++) {
      stackedLines[rowIx] ??= [];

      stackedLines[rowIx][vLineIx] = rowIx < currentVLineLength ? encrypted[encryptedIx++] : ' ';
    }
  }

  return stackedLines.filter(line => Array.isArray(line)).map(line => line.join(''));
}

export function routeDecryptUnarrange(stackedLines: string[], rectangleSize: number, blockSize: number): string {
  // Remove any empty space, we don't need it anymore
  stackedLines = stackedLines.map(line => line.replace(/ /g, ''));
  const messageLength = stackedLines.join('').length;
  const numberOfRows = Math.ceil(messageLength / rectangleSize);
  const blocksPerRow = Math.ceil(rectangleSize / blockSize);
  const lastRowLength = messageLength % rectangleSize;
  const lastRowBlocks = Math.ceil(lastRowLength / blockSize);

  const messageLines: string[][] = [];
  let stackedLineIx = 0;

  // For each column of blocks...
  for (let columnIx = 0; columnIx < blocksPerRow; columnIx++) {
    const rowsInBlock = columnIx < lastRowBlocks ? numberOfRows : numberOfRows - 1;
    // For each row in the column...
    for (let rowIx = 0; rowIx < rowsInBlock; rowIx++) {
      messageLines[rowIx] ??= [];
      messageLines[rowIx].push(stackedLines[stackedLineIx++]);
    }
  }

  return messageLines.flat().join('');
}
