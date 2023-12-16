class GUIService {
  constructor(text) {
    this._textParentElement = document.getElementById("textParent");
    this._dictionaryRulesElement = document.getElementById("dictionaryParent");

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
    let innerHTML = "";

    rules.forEach((rule) => {
      innerHTML += `
      <div class="alert alert-secondary" role="alert">${rule.encrypted} => ${rule.decrypted} <button type="button" class="btn btn-dark" onclick="guiService.removeRule('${rule.encrypted}')">Remove</button></div>`
    })

    this._dictionaryRulesElement.innerHTML = innerHTML;
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