const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    if (value === undefined) {
      this.chain.push(`( )`);
    }
    else {
      this.chain.push(`( ${value} )`);
    }
    return this;
  },
  removeLink(position) {
    if (isNaN(+(position - 1))) {
      this.chain = [];
      throw Error;
    }
    if (position >= this.chain.length || position - 1 < 0) {
      this.chain = [];
      throw Error;
    }
    if (!Number.isInteger(position)) {
      this.chain = [];
      throw Error;
    }
      
    this.chain.splice(position - 1,1);
    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    let result = this.chain.join('~~');
    console.log(this.chain);
    this.chain = [];
    return result;
  }
};

module.exports = chainMaker;
