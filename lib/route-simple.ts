import { chunk } from "./array";

export function routeEncrypt(message: string, rectangleSize: number, blockSize: number): string {
  const messageChars = message.split('');
  
  // Lay out the message in lines of length `rectangleSize`
  const messageLines = chunk(messageChars, rectangleSize);

  // Then break each line into chunks of length `blockSize`
  const chunkedLines = messageLines.map(line => chunk(line, blockSize));

  // Check to see if padding characters are needed at the end
  const allChunks = chunkedLines.flat();
  const finalChunk = allChunks.pop();
  const mainChunkSizes = allChunks.map(chunk => chunk.length);
  const oddChunkSize = mainChunkSizes.find(chunkSize => chunkSize !== blockSize);

  // Only add padding if the "odd chunks" (chunks at the ends of lines)
  //  are shorter than regular chunks, the final chunk isn't the same size
  //  as the odd chunks, and the final chunk isn't the same size as a
  //  regular chunk
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

  // We could skip the intermediate step of "stacking" the chunks—that's just
  //  a convenience to help visualize the process—but we'll need it intact
  //  for Part 3.
  const stackedLines: string[][] = [];
  
  // For each block column...
  const blocksPerLine = Math.ceil(rectangleSize / blockSize);
  for (let blockIx = 0; blockIx < blocksPerLine; blockIx++) {
    // For each row...
    const numberOfRows = chunkedLines.length;
    for (let rowIx = 0; rowIx < numberOfRows; rowIx++) {
      // We'll have numberOfRows rows for each block column
      const encryptedRowIx = rowIx + (blockIx * numberOfRows);
      stackedLines[encryptedRowIx] = chunkedLines[rowIx][blockIx];
    }
  }

  // Now we read out from top to bottom, starting at the left
  const encryptedChars: string[] = [];
  for (let charIx = 0; charIx < blockSize; charIx++) {
    for (let rowIx = 0; rowIx < stackedLines.length; rowIx++) {
      if (!Array.isArray(stackedLines[rowIx])) {
        continue;
      }

      const char = stackedLines[rowIx][charIx];
      if (typeof char === 'string') {
        encryptedChars.push(char);
      }
    }
  }
  
  // Join and return the encrypted message
  return encryptedChars.join('');
}

export function routeDecrypt(encrypted: string, rectangleSize: number, blockSize: number): string {
  // Do the math to determine the total number of chunks
  const numberOfRows = Math.ceil(encrypted.length / rectangleSize);
  const chunksPerRow = Math.ceil(rectangleSize / blockSize);
  const lastRowLength = encrypted.length % rectangleSize;
  const lastRowChunks = Math.ceil(lastRowLength / blockSize);
  const totalChunks = (chunksPerRow * (numberOfRows - 1)) + lastRowChunks;

  // If there are chunk(s) of a different size, either the
  //  "odd chunks" or the final chunk, find them so we know
  //  how many long/short vertical lines there are
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

  // Determine the length of the short and long lines
  const longVLineLength = totalChunks;
  const shortVLineLength = totalChunks -
    ((oddChunkSize !== blockSize ? numberOfRows - 1 : 0) +
     (lastChunkSize !== blockSize ? 1 : 0));

  const stackedLines: string[][] = [];
  let encryptedIx = 0;

  // For each vertical line...
  for (let vLineIx = 0; vLineIx < blockSize; vLineIx++) {
    // The long lines come first, then the short lines
    const currentVLineLength = vLineIx < numberOfLongVLines ?
      longVLineLength :
      shortVLineLength;

    // For each row in the current vertical line length...
    for (let rowIx = 0; rowIx < currentVLineLength; rowIx++) {
      stackedLines[rowIx] ??= [];

      // Place the next character from the encrypted message
      stackedLines[rowIx][vLineIx] = encrypted[encryptedIx++];
    }
  }

  // Now we'll place the blocks next to each other.
  // First, we need to figure out how many blocks are in each row
  const blocksPerRow = Math.ceil(rectangleSize / blockSize);
  const lastRowBlocks = Math.ceil(lastRowLength / blockSize);

  const messageLines: string[][] = [];
  let stackedLineIx = 0;

  // For each column of blocks...
  for (let columnIx = 0; columnIx < blocksPerRow; columnIx++) {
    const rowsInBlock = columnIx < lastRowBlocks ? numberOfRows : numberOfRows - 1;
    
    // For each row in the column...
    for (let rowIx = 0; rowIx < rowsInBlock; rowIx++) {
      messageLines[rowIx] ??= [];

      // Grab the next line from the stack and place it
      messageLines[rowIx].push(stackedLines[stackedLineIx++].join(''));
    }
  }

  return messageLines.flat().join('');
}
