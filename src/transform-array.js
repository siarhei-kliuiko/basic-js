const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if(!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const DISCARD_NEXT_COMMAND = "--discard-next";
  const DISCARD_PREV_COMMAND = "--discard-prev";
  const DOUBLE_NEXT_COMMAND = "--double-next";
  const DOUBLE_PREV_COMMAND = "--double-prev";

  const isControlSequence = (element) => typeof element === "string" &&
  (element === DISCARD_NEXT_COMMAND || element === DISCARD_PREV_COMMAND ||
  element === DOUBLE_NEXT_COMMAND || element === DOUBLE_PREV_COMMAND);

  const transformedArray = [];
  let executeNextCommand = true;
  for (let i = 0; i < arr.length; i++) {
    if (isControlSequence(arr[i])) {
      switch (arr[i]) {
        case DISCARD_NEXT_COMMAND:
          i++;
          executeNextCommand = false;
          break;
        case DISCARD_PREV_COMMAND:
          if (executeNextCommand && transformedArray.length) {
            transformedArray.pop();
          }

          executeNextCommand = true;
          break;
        case DOUBLE_NEXT_COMMAND:
          if (i + 1 < arr.length) {
            transformedArray.push(arr[i + 1]);
          }

          executeNextCommand = true;
          break;
        case DOUBLE_PREV_COMMAND:
          if (executeNextCommand && transformedArray.length) {
            transformedArray.push(transformedArray[transformedArray.length - 1]);
          }

          executeNextCommand = true;
          break;
      }
    } else {
      transformedArray.push(arr[i]);
      executeNextCommand = true;
    }
  }

  return transformedArray;
}

module.exports = {
  transform
};
