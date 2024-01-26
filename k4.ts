export const encrypted = `OBKR
UOXOGHULBSOLIFBBWFLRVQQPRNGKSSO
TWTQSJQSSEKZZWATJKLUDIAWINFBNYP
VTTMZFPKWGDKZXTJCDIGKUHUAUEKCAR`;

// If you can solve this you will be famous among
//  a small and very odd group of people.

export function ratePossibleK4Solution(attempt: string): number {
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
