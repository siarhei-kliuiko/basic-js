const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  static #cipher = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  #isDirect;

  constructor(isDirect = true) {
    this.#isDirect = isDirect;
  }

  #transformText(text, key, calcIndexFunc) {
    if (!text || !key) {
      throw new Error('Incorrect arguments!');
    }

    let transformedText = "";
    const upperText = text.toUpperCase();
    const upperKeys = key.toUpperCase();
    for (let i = 0, j = 0; i < upperText.length; i++) {
      let currentSymbol = upperText[this.#isDirect ? i : upperText.length - 1 - i];
      let symbolCipherIndex = VigenereCipheringMachine.#cipher.indexOf(currentSymbol);
      if (symbolCipherIndex > -1) {
        let keyCipherIndex;
        do {
          if (j >= upperKeys.length) {
            j = 0;
          }

          let currentKey = upperKeys[this.#isDirect ? j : upperKeys.length - 1 - j];
          keyCipherIndex = VigenereCipheringMachine.#cipher.indexOf(currentKey);
          j++;
        } while (keyCipherIndex === -1);

        transformedText += VigenereCipheringMachine.#cipher[calcIndexFunc(symbolCipherIndex, keyCipherIndex) % VigenereCipheringMachine.#cipher.length];
      } else {
        transformedText += currentSymbol;
      }
    }

    return transformedText;
  }


  encrypt(message, key) {
    return this.#transformText(message, key, (symbolCipherIndex, keyCipherIndex) => symbolCipherIndex + keyCipherIndex);
  }

  decrypt(encryptedMessage, key) {
    return this.#transformText(encryptedMessage, key, (encryptedSymbolCipherIndex, keyCipherIndex) => {
      let indexesDiff = encryptedSymbolCipherIndex - keyCipherIndex;
      if (indexesDiff < 0) {
        indexesDiff += VigenereCipheringMachine.#cipher.length;
      }

      return indexesDiff;
    });
  }
}

module.exports = {
  VigenereCipheringMachine
};
