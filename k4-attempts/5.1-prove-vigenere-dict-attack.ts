import { getCoincidence, hasHighCoincidence } from '../lib/coincidence';
import { allWords } from '../lib/dictionary';
import { generateAlphabet, vigDecrypt } from '../lib/vigenere';

console.log('---K1---')
const k1 = `EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJYQTQUXQBQVYUVLLTREVJYQTMKYRDMFD`;
const kryptosAlphabet = generateAlphabet('KRYPTOS');
let counter1 = 0;
for (const attempt of allWords) {
  const decrypted = vigDecrypt(k1, attempt, kryptosAlphabet);
  const coincidence = getCoincidence(decrypted);
  if (coincidence > 0.06) {
    console.log([coincidence, attempt, decrypted]);
    counter1++;
  }
}

console.log('K1 CANDIDATES', counter1);
// 930 candidates because the text is so short - a lot, but easy to scan through quickly

console.log('---K2---')
const k2 = `VFPJUDEEHZWETZYVGWHKKQETGFQJNCE
GGWHKK?DQMCPFQZDQMMIAGPFXHQRLG
TIMVMZJANQLVKQEDAGDVFRPJUNGEUNA
QZGZLECGYUXUEENJTBJLBQCRTBJDFHRR
YIZETKZEMVDUFKSJHKFWHKUWQLSZFTI
HHDDDUVH?DWKBFUFPWNTDFIYCUQZERE
EVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDX
FLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKF
FHQNTGPUAECNUVPDJMQCLQUMUNEDFQ
ELZZVRRGKFFVOEEXBDMVPNFQXEZLGRE
DNQFMPNZGLFLPMRJQYALMGNUVPDXVKP
DQUMEBEDMHDAFMJGZNUPLGEWJLLAETG`;

for (const attempt of allWords) {
  const decrypted = vigDecrypt(k2, attempt, kryptosAlphabet);
  const coincidence = getCoincidence(decrypted);
  if (coincidence > 0.06) {
    console.log([coincidence, attempt, decrypted]);
  }
}

// No need to log the number of candidates, there's only one