export interface SkipMatch {
  skip: number;
  matched: number[];
}

export function skipTest(attempt: string, lettersToValidate: string, logMatch = true): SkipMatch | null {
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
      
      let candidatesMatched: number[] = [];
      let skipped = startingPoint;
      for (const candidates of locations.slice(1)) {
        skipped = (skipped + skipAttempt) % messageLength;
        if (!candidates.includes(skipped)) {
          candidatesMatched = [];
          break;
        }
        
        candidatesMatched.push(skipped);
      }
      
      if (candidatesMatched.length) {
        const match: SkipMatch = {skip: skipAttempt, matched: candidatesMatched};
        if (logMatch) {
          console.log(match);
        }
        return match;
      }
    }
  }

  return null;
}
