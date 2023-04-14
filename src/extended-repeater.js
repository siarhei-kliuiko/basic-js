const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const createRepeatedString = (element, repeatNumber, separator) => {
    if (typeof element !== "undefined") {
      return repeatNumber > 0 ? Array(repeatNumber).fill(String(element)).join(separator) : String(element);
    } else {
      return "";
    }
  };

  const additionPart = createRepeatedString(options.addition, options.additionRepeatTimes, options.additionSeparator ? options.additionSeparator : "|");
  return createRepeatedString(str + additionPart, options.repeatTimes, options.separator ? options.separator : "+");
}

module.exports = {
  repeater
};
