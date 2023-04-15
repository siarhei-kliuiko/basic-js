const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let encodedString = "";
  for (let i = 0; i < str.length;) {
    let currentCharCounter = 1;
    let j = i + 1;
    while (j < str.length && str[i] === str[j]) {
      currentCharCounter++;
      j++;
    }

    encodedString += (currentCharCounter > 1 ? currentCharCounter : "") + str[i];
    i = j;
  }

  return encodedString;
}

module.exports = {
  encodeLine
};
