const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const MINE_AREA_SIZE = 3;
  const mineSweeperField = [...Array(matrix.length)].map(() => Array(matrix[0].length).fill(0));
  const increaseFieldNumber = (row, col) => {
    if (row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length) {
      mineSweeperField[row][col]++;
    }
  };
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        mineSweeperField[i][j]--;
        for (let row = 0; row < MINE_AREA_SIZE; row++) {
          for (let col = 0; col < MINE_AREA_SIZE; col++) {
            increaseFieldNumber(i - 1 + row, j - 1 + col);
          }
        }
      }
    }
  }

  return mineSweeperField;
}

module.exports = {
  minesweeper
};
