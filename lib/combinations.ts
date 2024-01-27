// Thanks dipo1
// https://gist.github.com/dipo1/5ef88a14821202da0b33d84c5bfacc58#file-char_combinations-js
export function* allCharCombinations(chars: string, minLength: number, maxLength: number) {
  //Generate for each word length
  for (let i = minLength; i <= maxLength; i++) {

    //Generate the first word for the password length by the repetition of first character.
    let word = (chars[0] || '').repeat(i);
    yield word;

    //Generate other possible combinations for the word
    //Total combinations will be chars.length raised to power of word.length
    //Make iteration for all possible combinations
    for (let j = 1; j < Math.pow(chars.length, i); j++) {

      //Make iteration for all indices of the word
      for(let k = 0; k < i; k++) {

        //check if the current index char need to be flipped to the next char.
        if(!(j % Math.pow(chars.length, k))) {
          
          // Flip the current index char to the next.
          let charIndex = chars.indexOf(word[k]) + 1;
          const char = chars[charIndex < chars.length ? charIndex : 0];
          word = word.substr(0, k) + char + word.substr(k + char.length);
        }
      }

      //Re-oder not neccesary but it makes the words are yeilded alphabetically on ascending order.
      yield word.split('').reverse().join('');
    }
  }
}