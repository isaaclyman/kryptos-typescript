import { routeDecrypt, routeEncrypt } from "../lib/route-simple";

const rectangleSize = 15;
const blockSize = 4

const encrypted = routeEncrypt(
  'THEFITNESSGRAMPACERTESTISAMULTISTAGEAEROBICCAPACITYTEST',
  rectangleSize,
  blockSize
);
console.log(encrypted);
// > TAIPITGTSIRSAUCHCSATEEYSSOTMLCEETCNSATGABQPTAFRAIETEERMI

const decrypted = routeDecrypt(encrypted, rectangleSize, blockSize);
console.log(decrypted);
// > THEFITNESSGRAMPACERTESTISAMULTISTAGEAEROBICCAPACITYTESTQ