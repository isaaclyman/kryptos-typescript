import { encryptedK4, ratePossibleK4Solution } from "../k4";
import { generateAlphabet } from "../lib/alphabet";
import { routedColumnarDecrypt, routedColumnarEncrypt } from "../lib/columnar-route";
import { vigDecrypt, vigEncrypt } from "../lib/vigenere";

const results = [];

// K1-K3 forwards

(function () {
  const vigKryptos1 = vigDecrypt(
    encryptedK4,
    'PALIMPSEST',
    generateAlphabet('KRYPTOS')
  );
  const vigKryptos2 = vigDecrypt(
    vigKryptos1,
    'ABSCISSA',
    generateAlphabet('KRYPTOS')
  );
  const routedColumnar = routedColumnarDecrypt(vigKryptos2, 86, 'KRYPTOS');
  
  results.push({
    description: 'K1-K3 ciphers',
    score: ratePossibleK4Solution(routedColumnar),
    decrypted: routedColumnar,
  });
})();


// K3-K1 backwards

(function () {
  const routedColumnar = routedColumnarEncrypt(encryptedK4, 86, 'KRYPTOS');
  
  const vigKryptosReversed2 = vigEncrypt(
    routedColumnar,
    'ABSCISSA',
    generateAlphabet('KRYPTOS')
  );
  const vigKryptosReversed1 = vigEncrypt(
    vigKryptosReversed2,
    'PALIMPSEST',
    generateAlphabet('KRYPTOS')
  );
  
  results.push({
    description: 'K3-K1 ciphers (reversed)',
    score: ratePossibleK4Solution(vigKryptosReversed1),
    decrypted: vigKryptosReversed1,
  });
})();

// LOG RESULTS

console.table(
  results.map((result) => ({
    ...result,
    decrypted: result.decrypted.slice(0, 15) + '...',
  }))
);
