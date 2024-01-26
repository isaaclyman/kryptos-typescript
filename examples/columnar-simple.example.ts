import { columnarDecrypt, columnarEncrypt } from "../lib/columnar-simple";

const key = 'HAMLET';
const message = 'OMYOFFENCEISRANKITSMELLSTOHEAVEN';

const encrypted = columnarEncrypt(message, key);
console.log(encrypted); // > MNAMONFIILAOERSTEOEKLEYCNEHFSTSV

const decrypted = columnarDecrypt(encrypted, key);
console.log(decrypted); // > OMYOFFENCEISRANKITSMELLSTOHEAVEN