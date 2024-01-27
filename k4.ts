export const encryptedK4 =
  'OBKR' +
  'UOXOGHULBSOLIFBBWFLRVQQPRNGKSSO' +
  'TWTQSJQSSEKZZWATJKLUDIAWINFBNYP' +
  'VTTMZFPKWGDKZXTJCDIGKUHUAUEKCAR';

// If you can solve this you will be famous among
//  a small and very odd group of people.

export function ratePossibleK4SolutionV1(attempt: string): number {
  attempt = attempt.toUpperCase();
  const reversed = attempt.split('').reverse().join('');

  let score = 0;

  if (attempt.includes('EASTNORTHEAST') || reversed.includes('EASTNORTHEAST')) {
    score++;
  }

  if (
    attempt.slice(21).startsWith('EASTNORTHEAST') ||
    reversed.slice(21).startsWith('EASTNORTHEAST')
  ) {
    score++;
  }

  if (attempt.includes('BERLINCLOCK') || reversed.includes('BERLINCLOCK')) {
    score++;
  }

  if (
    attempt.slice(63).startsWith('BERLINCLOCK') ||
    reversed.slice(63).startsWith('BERLINCLOCK')
  ) {
    score++;
  }

  return score;
}

// Gives points if you have all the necessary letters to match the clues,
//  not just if you have them verbatim. Sniffs out attempts
//  that might be correct after some kind of transposition.
export function ratePossibleK4Solution(attempt: string): number {
  let score = ratePossibleK4SolutionV1(attempt) * 10;

  const attemptChars = attempt.split('');
  const phrase1 = 'EASTNORTHEAST'.split('');
  const phrase2 = 'BERLINCLOCK'.split('');

  let hasAllChars1 = true;
  for (const char of phrase1) {
    const matchingIndex = attemptChars.indexOf(char);
    if (matchingIndex === -1) {
      hasAllChars1 = false;
      break;
    }

    attemptChars.splice(matchingIndex, 1);
  }

  if (hasAllChars1) {
    score++;
  }

  let hasAllChars2 = true;
  for (const char of phrase2) {
    const matchingIndex = attemptChars.indexOf(char);
    if (matchingIndex === -1) {
      hasAllChars2 = false;
      break;
    }

    attemptChars.splice(matchingIndex, 1);
  }

  if (hasAllChars2) {
    score++;
  }

  return score;
}
