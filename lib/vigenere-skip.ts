import { encryptedK4, ratePossibleK4Solution } from "../k4";
import { vigDecrypt, generateAlphabet } from "./vigenere";

export function attemptVigDecryptAndSkip(key: string, alphabetPrefix: string, showCandidates: boolean = false): number {
  const attempt = vigDecrypt(encryptedK4, key, generateAlphabet(alphabetPrefix));
  const rating = ratePossibleK4Solution(attempt);
  
  const lettersToValidate = ['B','E','R','L'];
  const locations: number[][] = [];
  if (rating >= 2) {
    if (showCandidates) {
      console.log(rating, key);
      console.log(attempt);
    }

    for (const letter of lettersToValidate) {
      const letterLocations = attempt.split('').reduce((locs, char, ix) => {
        if (char === letter) {
          locs.push(ix);
        }
        return locs;
      }, []);
      locations.push(letterLocations);
    }
  
    const messageLength = attempt.length;
  
    for (const startingPoint of locations[0]) {
      // Not all transpositions would have a repeated skip solution like K3, but it's worth a shot
      for (let skipAttempt = 1; skipAttempt < 500; skipAttempt++) {
        const skipped = (startingPoint + skipAttempt) % messageLength;
    
        let candidatesMatched = [];
        for (const candidates of locations.slice(1)) {
          if (!candidates.includes(skipped)) {
            candidatesMatched = [];
            break;
          }
    
          candidatesMatched.push(skipped);
        }
        
        if (candidatesMatched.length) {
          console.log({skipAttempt, candidatesMatched});
        }
      }
    }
  }
  
  return rating;
}
