import {
  routeEncryptArrange,
  routeEncryptReadOut,
  routeDecryptReadIn,
  routeDecryptUnarrange,
  columnarEncryptLines,
  columnarDecryptLines,
} from "../lib/columnar-route";

const message =
  "THEREAREMOREHYDROGENATOMSINAWATERMOLECULETHANSTARSINTHESOLARSYSTEM";
const key = "PLANETS";
const rectangleSize = 15;

const arrangedToEncrypt = routeEncryptArrange(
  message,
  rectangleSize,
  key.length
);
console.log(arrangedToEncrypt);
/* >
[
  "THEREAR", "ROGENAT", "TERMOLE", "STARSIN",
  "SYSTEMQ", "EMOREHY", "OMSINAW", "CULETHA",
  "THESOLA", "D", "A", "N",
  "R"
]
*/

const columnarEncrypted = columnarEncryptLines(arrangedToEncrypt, key);
console.log(columnarEncrypted);
/* >
[
  "EEHRTRA", "GNOERTA", "ROEMTEL", "ASTRSNI",
  "SEYTSQM", "OEMREYH", "SNMIOWA", "LTUECAH",
  "EOHSTAL", "    D  ", "    A  ", "    N  ",
  "    R  "
]
*/

const encrypted = routeEncryptReadOut(columnarEncrypted, key.length);
console.log(encrypted);
/* >
EGRASOSLEENOSEENTOHOETYMMUHREMRTRIESTRTSSEOCTDANRRTENQYWAAAALIMHAHL
*/

const arrangedToDecrypt = routeDecryptReadIn(encrypted, rectangleSize, key);
console.log(arrangedToDecrypt);
/* >
[
  "EEHRTRA", "GNOERTA", "ROEMTEL", "ASTRSNI",
  "SEYTSQM", "OEMREYH", "SNMIOWA", "LTUECAH",
  "EOHSTAL", "    D  ", "    A  ", "    N  ",
  "    R  "
]
*/

const columnarDecrypted = columnarDecryptLines(arrangedToDecrypt, key);
console.log(columnarDecrypted);
/* >
[
  "THEREAR", "ROGENAT", "TERMOLE", "STARSIN",
  "SYSTEMQ", "EMOREHY", "OMSINAW", "CULETHA",
  "THESOLA", "D      ", "A      ", "N      ",
  "R      "
]
*/

const decrypted = routeDecryptUnarrange(
  columnarDecrypted,
  rectangleSize,
  key.length
);
console.log(decrypted);

/* >
THEREAREMOREHYDROGENATOMSINAWATERMOLECULETHANSTARSINTHESOLARSYSTEMQ
*/
