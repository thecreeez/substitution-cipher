class GUIService {
  constructor(text) {
    this._textParentElement = document.getElementById("textParent");
    this._dictionaryTable = document.getElementById("dictionaryTable");

    this._text = text;
  }

  /**
   * {
   *  text: ? or known
   *  known: true/false
   *  tooltip: AP
   * }
   */
  renderText(letters) {
    let innerHTML = "";
    letters.forEach((letter) => {
      let letterHTML = `<div class="unknownLetter" data-toggle="tooltip" data-placement="top" title="${letter.tooltip}">${letter.text == " " ? "_" : letter.text}</div>`

      innerHTML += letterHTML;
    })

    this._textParentElement.innerHTML = innerHTML;
  }

  /**
   * {
   *  encrypted: "AB"
   *  decrypted: "а"
   * }
   */
  renderRules(rules) {
    const createRulesMatrix = (rules) => {
      const ALPHABET = new Set(rules.map(rule => rule.encrypted[0]).sort());
      const rulesMatrix = [['-']];
      rulesMatrix[0].push(...ALPHABET);

      ALPHABET.forEach(letter =>
          rulesMatrix.push([letter]));

      const line = new Array(ALPHABET.size).fill("-");
      for (let i = 1; i <= ALPHABET.size; i++) {
        rulesMatrix[i].push(...line);
      }

      return rulesMatrix;
    }

    const fillRulesMatrix = (rulesMatrix, rules) => {
      rules.forEach(rule => {
        const j = rulesMatrix[0].indexOf(rule.encrypted[0]);
        const i = rulesMatrix[0].indexOf(rule.encrypted[1]);
        rulesMatrix[i][j] = rule.decrypted;
      })
    }

    const fillHtmlTable = (rulesMatrix) => {
      rulesMatrix.forEach(line => {
        const tr = document.createElement('tr');
        line.forEach(rule => {
          const td = document.createElement('tr');
          td.innerText = rule;
          tr.appendChild(td);
        })
        this._dictionaryTable.appendChild(tr);
      })
    }

    const rulesMatrix = createRulesMatrix(rules);
    fillRulesMatrix(rulesMatrix, rules);
    fillHtmlTable(rulesMatrix);
  }

  render() {
    this.renderRules(app.getRules());
    this.renderText(app.getFormedText(this._text))
  }

  addRule(encrypted, decrypted) {
    app.addRule(encrypted, decrypted);
    this.render();
  }

  removeRule(id) {
    app.removeRule(id);
    this.render();
  }
}