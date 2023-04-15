const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const number = n.toString();
  const possibleNumbers = [];
  for (let i = 0; i < number.length; i++) {
    let possibleNumber = "";
    for (let j = 0; j < number.length; j++) {
      if (i !== j) {
        possibleNumber += number[j];
      }
    }

    possibleNumbers.push(Number(possibleNumber));
  }

  return Math.max(...possibleNumbers);
}

module.exports = {
  deleteDigit
};
