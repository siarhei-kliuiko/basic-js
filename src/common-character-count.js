const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  let stringForIteration = s1;
  let stringToSearchChars = s2;
  if (s1.length > s2.length) {
    stringForIteration = s2;
    stringToSearchChars = s1;
  }

  let commonCharsCounter = 0;
  const commonCharsFlags = Array(stringToSearchChars.length).fill(false);

  for (let i = 0; i < stringForIteration.length; i++) {
    for (let j = 0; j < stringToSearchChars.length; j++) {
      if (!commonCharsFlags[j] && stringForIteration[i] === stringToSearchChars[j]) {
        commonCharsCounter++;
        commonCharsFlags[j] = true;
        break;
      }
    }
  }

  return commonCharsCounter;
}

module.exports = {
  getCommonCharacterCount
};
