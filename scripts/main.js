const tests = [
  { decrypted: "противника", encrypted: "FKMNFOEHHNHKCIGKOFBCNCNIOEFEHJIAMGMMGDFONKALNBBMMFEEOFPBMKBBMBBM" },
  { decrypted: "противника", encrypted: "FEBFCDMHHPHKCIGKOKFGAPAIOLFNHJIAMOBPBPFONMAMNBBMMMPHLNFBMNBDMBBM" },
  { decrypted: "7", encrypted: "MFOCNEGGHMBKMBBMMCOGEJJBMKBNMBBM" },
  { decrypted: false, encrypted: BIG_ENCRYPTED_TEXT }
]

const frequencyVisualizer = new FrequencyVisualizer(CANVAS_VISUALIZER);

let app = new Application();

if (LOAD) {
  app.load(LOAD);
} else {
  tests.forEach((test, i) => {
    if (test.decrypted) {
      console.log(`[Пример-${i}] ${test.decrypted}: Новые буквы в словаре:${app.useExample(test).join("/")}`)
    }
  })
}

let guiService = new GUIService(tests[3].encrypted);
guiService.render();

frequencyVisualizer.render(Utils.countLetters(app.getLettersOfEncryptedText(tests[3].encrypted, false)));