import { ratePossibleK4Solution } from "../k4";
import { hasHighCoincidence, getCoincidence } from "./coincidence";
import { skipTest } from "./skip";

export function validate(attempt: string, method: string, key: string, showCandidates: boolean = false): number {
  const rating = ratePossibleK4Solution(attempt);

  if (rating > 2) {
    console.log('--ALERT--');
    console.log(rating, key);
    console.log('--ALERT--');
  }

  if (rating >= 2) {
    if (showCandidates) {
      console.log(rating, key);
      console.log(attempt);
    }

    if (hasHighCoincidence(attempt)) {
      const coincidence = getCoincidence(attempt);
      console.log([coincidence, method, key, attempt]);

      const match1 = skipTest(attempt, 'BERLIN');
      const match2 = skipTest(attempt, 'EASTNO');

      if (match1 || match2) {
        if (match1 && match1.result.length % match1.skip === 0) {
          console.log('DUPLICATES LIKELY');
        }
        if (match2 && match2.result.length % match2.skip === 0) {
          console.log('DUPLICATES LIKELY');
        }
        console.log(['KEY', key, method]);
        console.log([match1, match2]);
      }
    }
  }

  return rating;
}