class Utils {
  static getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  }

  static countLetters(letters) {
    let outLetters = {};

    letters.forEach((letter) => {
      if (!outLetters[letter]) {
        outLetters[letter] = 0;
      }

      outLetters[letter]++;
    })

    return outLetters;
  }
}