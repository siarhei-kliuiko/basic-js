const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chainedValues: [],
  getLength() {
    return this.chainedValues.length;
  },
  addLink(value) {
    this.chainedValues.push(String(value));
    return this;
  },
  removeLink(position) {
    if (typeof position === "number" && position > 0 && position <= this.chainedValues.length) {
      this.chainedValues.splice(position - 1, 1);
    } else {
      this.chainedValues = [];
      throw new Error("You can't remove incorrect link!");
    }

    return this;
  },
  reverseChain() {
    this.chainedValues.reverse();
    return this;
  },
  finishChain() {
    const result = `( ${this.chainedValues.join(" )~~( ")} )`;
    this.chainedValues = [];
    return result;
  }
};

module.exports = {
  chainMaker
};
