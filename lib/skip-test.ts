export function skipTest(attempt: string, lettersToValidate: string) {
  const attemptChars = attempt.split('');
  const locations: number[][] = [];

  for (const letter of lettersToValidate.split('')) {
    const letterLocations = attemptChars.reduce((locs, char, ix) => {
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
    for (let skipAttempt = 1; skipAttempt < (attempt.length + 2); skipAttempt++) {
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
