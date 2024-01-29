import { standardAlphabet } from "../lib/alphabet";
import { vigDecrypt, vigEncrypt } from "../lib/vigenere";

const sourceMessage = 'PROGRAMMINGISFUN';
const key = 'EXCEPTFORJAVA';

const encrypted = vigEncrypt(sourceMessage, key, standardAlphabet);
console.log(encrypted); // > TOQKGTRAZWGDSJRP

const decrypted = vigDecrypt(encrypted, key, standardAlphabet);
console.log(decrypted); // > PROGRAMMINGISFUN