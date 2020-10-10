const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    let subarraysCounter = 0;
    for (let subarray of arr) {
      if (Array.isArray(subarray)) {
        subarraysCounter += 1;
      }
    }
    if (subarraysCounter === 0) {
      return 1;
    }

    let subarrayDepths = [];
    for (let subarray of arr) {
      if (Array.isArray(subarray)) {
        subarrayDepths.push(this.calculateDepth(subarray));
      }
    }
    
    let max = subarrayDepths[0];
    for (let i = 0; i < subarrayDepths.length; i++) {
      if (max < subarrayDepths[i]) max = subarrayDepths[i];
    }
    return max + 1;
  }
};