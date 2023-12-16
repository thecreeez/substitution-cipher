class Application {
  /**
   * U - Полезная
   * T - Треш
   * @param {String} positions 
   */
  constructor(positions = "UTTT TTTU UTUT UUUU") {
    this._positions = positions.replaceAll(" ", "").split("");

    this._dictionary = {}
  }

  load(save) {
    this._positions = save.pattern.replaceAll(" ", "").split("");
    this._dictionary = save.dictionary;
    console.log(`Загружен сохраненный словарь от: ${save.date}`)
  }

  _removeTrashSymbols(text) {
    if (text.length % this._positions.length != 0) {
      return console.error(`Неверный текст.`);
    }

    let currentPosition = 0;
    let blockSize = this._positions.length;

    let outText = "";

    while (currentPosition * blockSize + blockSize <= text.length) {
      let block = text.slice(currentPosition * blockSize, (currentPosition + 1) * blockSize);

      this._positions.forEach((position, i) => {
        if (position == "U") {
          outText += block.charAt(i);
        }
      })
      currentPosition++;
    }

  return outText;
  }

  // ТОЛЬКО БЕЗТРЕШОВЫЕ СИМВОЛЫ
  _sliceToLettersOld(text) {
    if (text.length % 2 == 1) {
      return console.error(`Неверный текст.`);
    }

    let currentPosition = 0;

    let letters = [];

    while (currentPosition * 2 + 2 <= text.length) {
      let letterPair = text.slice(currentPosition * 2, (currentPosition + 1) * 2);

      letters.push(letterPair);
      currentPosition++;
    }

    return letters;
  }

  _sliceToLetters(text) {
    if (text.length % 2 == 1) {
      return console.error(`Неверный текст.`);
    }

    let lettersPairPos = [
      [1,2],
      [3,4],
      [5,7],
      [6,0]
    ]

    let letters = [];

    for (let i = 0; i < text.length / 8; i++) {
      let pattern = text.slice(i * 8, (i+1) * 8);

      lettersPairPos.forEach((letterPair) => {
        letters.push(pattern.charAt(letterPair[0]) + pattern.charAt(letterPair[1]));
      })
    }

    return letters;
  }

  _learnDictionary(letterPairs, decrypted) {
    let decryptedLetters = decrypted.split("");
    let newPositions = [];

    while (decryptedLetters.length < letterPairs.length) {
      decryptedLetters.push("<EMPTY>");
    }

    letterPairs.forEach((letterPair, i) => {
      if (!this._dictionary[letterPair]) {
        this._dictionary[letterPair] = decryptedLetters[i];
        newPositions.push(`[${letterPair} => ${decryptedLetters[i]}]`);
      }
    })

    return newPositions;
  }

  useExample(test) {
    return app._learnDictionary(
      app._sliceToLetters(app._removeTrashSymbols(test.encrypted)),
      test.decrypted
    );
  }

  decrypt(encrypted) {
    let letters = this._sliceToLetters(this._removeTrashSymbols(encrypted));

    let decryptedText = "";

    letters.forEach((letterPair, i) => {
      decryptedText += this._dictionary[letterPair] ? this._dictionary[letterPair] : `<img src="prikol.png">`; //[${letterPair}]
    })

    return decryptedText;
  }

  getLettersOfEncryptedText(encrypted, ignoreKnown = false) {
    let letters = this._sliceToLetters(this._removeTrashSymbols(encrypted));

    if (ignoreKnown)
      return letters.filter((letterPair) => !this._dictionary[letterPair]);

    return letters;
  }

  getRules() {
    let rules = [];

    for (let encrypted in this._dictionary) {
      rules.push({
        encrypted,
        decrypted: this._dictionary[encrypted]
      })
    }

    return rules;
  }

  removeRule(encrypted) {
    delete this._dictionary[encrypted];
  }

  addRule(encrypted, decrypted) {
    this._dictionary[encrypted] = decrypted;
  }

  getFormedText(text) {
    let letters = this._sliceToLetters(this._removeTrashSymbols(text));

    let formedText = [];

    letters.forEach((letterPair, i) => {
      formedText.push({
        text: this._dictionary[letterPair] ? this._dictionary[letterPair] : `<img src="prikol.png" width=20 height=20>`,
        known: !!this._dictionary[letterPair],
        tooltip: letterPair
      });
    })
    return formedText;
  }
}