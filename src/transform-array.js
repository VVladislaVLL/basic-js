const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  let discard_next = (arr, i) => {
    if (arr[i + 1] != undefined) {
      arr.splice(i, 2);
    }
  }
  let discard_prev = (arr, i) => {
    if (arr[i - 1] != undefined) {
      arr.splice(i - 1, 2);
    }
  }

  let double_next = (arr, i) => {
    if (arr[i + 1] != undefined) {
      // arr.splice(i, 0, arr[i+1]);
      arr[i] = arr[i+1];
    }
  }

  let double_prev = (arr, i) => {
    if (arr[i - 1] != undefined) {
      // arr.splice(i, 0, arr[i-1]);
      arr[i] = arr[i-1];
    }
  }


  if (!Array.isArray(arr)) throw Error;
  let set = new Set();
  set.add('--discard-next');
  set.add('--discard-prev');
  set.add('--double-next');
  set.add('--double-prev');

  let newArr = arr;
  for (let i = 0; i < newArr.length; i++) {
    if (set.has(arr[i])) {
      if (arr[i] === '--discard-next') discard_next(newArr, i);
      if (arr[i] === '--discard-prev') discard_prev(newArr, i);
      if (arr[i] === '--double-next') double_next(newArr, i);
      if (arr[i] === '--double-prev') double_prev(newArr, i);
    }
  }
  return newArr;
};
