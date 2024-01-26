import { generateAlphabet, vigDecrypt } from './lib/vigenere';

const encrypted = `EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJ
YQTQUXQBQVYUVLLTREVJYQTMKYRDMFD`;
const key = 'PALIMPSEST';
const alphabet = generateAlphabet('KRYPTOS');

const decrypted = vigDecrypt(encrypted, key, alphabet);
console.log(decrypted);
/* >
BETWEENSUBTLESHADINGANDTHEABSENC
EOFLIGHTLIESTHENUANCEOFIQLUSION
*/
