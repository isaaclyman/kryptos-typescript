import { encryptedK4, ratePossibleK4Solution } from '../k4';
import { routedColumnarDecrypt, routedColumnarEncrypt } from '../lib/columnar-route';
import { columnarDecrypt, columnarEncrypt } from '../lib/columnar-simple';
import { routeDecrypt, routeEncrypt } from '../lib/route-simple';
import {
  generateAlphabet,
  standardAlphabet,
  vigDecrypt,
  vigEncrypt,
} from '../lib/vigenere';

const results = [];

// VIGENERE > PALIMPSEST

const vigStandard1 = vigDecrypt(encryptedK4, 'PALIMPSEST', standardAlphabet);
results.push({
  description: 'Vigenere | PALIMPSEST | Standard alphabet',
  score: ratePossibleK4Solution(vigStandard1),
  decrypted: vigStandard1,
});

const vigReversed1 = vigEncrypt(encryptedK4, 'PALIMPSEST', standardAlphabet);
results.push({
  description: 'Vigenere (reversed) | PALIMPSEST | Standard alphabet',
  score: ratePossibleK4Solution(vigReversed1),
  decrypted: vigReversed1,
});

const vigKryptos1 = vigDecrypt(
  encryptedK4,
  'PALIMPSEST',
  generateAlphabet('KRYPTOS')
);
results.push({
  description: 'Vigenere | PALIMPSEST | KRYPTOS alphabet',
  score: ratePossibleK4Solution(vigKryptos1),
  decrypted: vigKryptos1,
});

const vigReversedKryptos1 = vigEncrypt(
  encryptedK4,
  'PALIMPSEST',
  generateAlphabet('KRYPTOS')
);
results.push({
  description: 'Vigenere (reversed) | PALIMPSEST | KRYPTOS alphabet',
  score: ratePossibleK4Solution(vigReversedKryptos1),
  decrypted: vigReversedKryptos1,
});

// VIGENERE > ABSCISSA

const vigStandard2 = vigDecrypt(encryptedK4, 'ABSCISSA', standardAlphabet);
results.push({
  description: 'Vigenere | ABSCISSA | Standard alphabet',
  score: ratePossibleK4Solution(vigStandard2),
  decrypted: vigStandard2,
});

const vigReversed2 = vigEncrypt(encryptedK4, 'ABSCISSA', standardAlphabet);
results.push({
  description: 'Vigenere (reversed) | ABSCISSA | Standard alphabet',
  score: ratePossibleK4Solution(vigReversed2),
  decrypted: vigReversed2,
});

const vigKryptos2 = vigDecrypt(
  encryptedK4,
  'ABSCISSA',
  generateAlphabet('KRYPTOS')
);
results.push({
  description: 'Vigenere | ABSCISSA | KRYPTOS alphabet',
  score: ratePossibleK4Solution(vigKryptos2),
  decrypted: vigKryptos2,
});

const vigReversedKryptos2 = vigEncrypt(
  encryptedK4,
  'ABSCISSA',
  generateAlphabet('KRYPTOS')
);
results.push({
  description: 'Vigenere (reversed) | ABSCISSA | KRYPTOS alphabet',
  score: ratePossibleK4Solution(vigReversedKryptos2),
  decrypted: vigReversedKryptos2,
});

// COLUMNAR > KRYPTOS

const columnar1 = columnarDecrypt(encryptedK4, 'KRYPTOS');
results.push({
  description: 'Keyed columnar | KRYPTOS',
  score: ratePossibleK4Solution(columnar1),
  decrypted: columnar1,
});

const columnarReversed1 = columnarEncrypt(encryptedK4, 'KRYPTOS');
results.push({
  description: 'Keyed columnar (reversed) | KRYPTOS',
  score: ratePossibleK4Solution(columnarReversed1),
  decrypted: columnarReversed1,
});

// ROUTE > (86, 7)

const route1 = routeDecrypt(encryptedK4, 86, 7);
results.push({
  description: 'Route | 86,7',
  score: ratePossibleK4Solution(route1),
  decrypted: route1,
});

const routeReversed1 = routeEncrypt(encryptedK4, 86, 7);
results.push({
  description: 'Route (reversed) | 86,7',
  score: ratePossibleK4Solution(routeReversed1),
  decrypted: routeReversed1,
});

// ROUTED COLUMNAR > (86, KRYPTOS)
const routedColumnar1 = routedColumnarDecrypt(encryptedK4, 86, 'KRYPTOS');
results.push({
  description: 'Routed columnar | 86,KRYPTOS',
  score: ratePossibleK4Solution(routedColumnar1),
  decrypted: routedColumnar1,
});

const routedColumnarReversed1 = routedColumnarEncrypt(encryptedK4, 86, 'KRYPTOS');
results.push({
  description: 'Routed columnar (reversed) | 86,KRYPTOS',
  score: ratePossibleK4Solution(routedColumnarReversed1),
  decrypted: routedColumnarReversed1,
});

// LOG RESULTS

console.table(
  results.map((result) => ({
    ...result,
    decrypted: result.decrypted.slice(0, 15) + '...',
  }))
);
