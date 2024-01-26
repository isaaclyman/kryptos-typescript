import { encryptedK4, ratePossibleK4Solution } from "../k4";
import { routedColumnarDecrypt, routedColumnarEncrypt } from "../lib/columnar-route";
import { vigDecrypt, generateAlphabet, vigEncrypt } from "../lib/vigenere";

const results = [];

// Vigenere PALIMPSEST + Vigenere ABSCISSA

(function () {
  const vigPalimpsest = vigDecrypt(encryptedK4, 'PALIMPSEST', generateAlphabet('KRYPTOS'));
  const vigAbscissa = vigDecrypt(vigPalimpsest, 'ABSCISSA', generateAlphabet('KRYPTOS'));

  results.push({
    description: 'K1 + K2 ciphers',
    score: ratePossibleK4Solution(vigAbscissa),
    decrypted: vigAbscissa,
  });
})();


(function () {
  const vigAbscissa = vigEncrypt(encryptedK4, 'ABSCISSA', generateAlphabet('KRYPTOS'));
  const vigPalimpsest = vigEncrypt(vigAbscissa, 'PALIMPSEST', generateAlphabet('KRYPTOS'));

  results.push({
    description: 'K2 + K1 ciphers (reversed)',
    score: ratePossibleK4Solution(vigPalimpsest),
    decrypted: vigPalimpsest,
  });
})();

// Vigenere PALIMPSEST + routed columnar

(function () {
  const vigKryptos = vigDecrypt(encryptedK4, 'PALIMPSEST', generateAlphabet('KRYPTOS'));
  const routedColumnar = routedColumnarDecrypt(vigKryptos, 86, 'KRYPTOS');

  results.push({
    description: 'K1 + K3 ciphers',
    score: ratePossibleK4Solution(routedColumnar),
    decrypted: routedColumnar,
  });
})();

(function () {
  const routedColumnar = routedColumnarEncrypt(encryptedK4, 86, 'KRYPTOS');
  const vigKryptos = vigEncrypt(routedColumnar, 'PALIMPSEST', generateAlphabet('KRYPTOS'));

  results.push({
    description: 'K3 + K1 ciphers (reversed)',
    score: ratePossibleK4Solution(vigKryptos),
    decrypted: vigKryptos,
  });
})();

// Vigenere ABSCISSA + routed columnar

(function () {
  const vigKryptos = vigDecrypt(encryptedK4, 'ABSCISSA', generateAlphabet('KRYPTOS'));
  const routedColumnar = routedColumnarDecrypt(vigKryptos, 86, 'KRYPTOS');

  results.push({
    description: 'K2 + K3 ciphers',
    score: ratePossibleK4Solution(routedColumnar),
    decrypted: routedColumnar,
  });
})();

(function () {
  const routedColumnar = routedColumnarEncrypt(encryptedK4, 86, 'KRYPTOS');
  const vigKryptos = vigEncrypt(routedColumnar, 'ABSCISSA', generateAlphabet('KRYPTOS'));

  results.push({
    description: 'K3 + K2 ciphers (reversed)',
    score: ratePossibleK4Solution(vigKryptos),
    decrypted: vigKryptos,
  });
})();

// LOG RESULTS

console.table(
  results.map((result) => ({
    ...result,
    decrypted: result.decrypted.slice(0, 15) + '...',
  }))
);
