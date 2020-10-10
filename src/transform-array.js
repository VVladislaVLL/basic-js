const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  let discard_next = (array, i, set) => {
    if (array[i + 1] != undefined) {
      if (!set.has(array[i + 1])) {
        array[i]  = '--';
        array[i + 1]  = '--';
      }
      else {
      array.splice(i, 1);
      }
    }
    else {
      array.splice(i, 1);
    }
  }
  let discard_prev = (array, i,set) => {
    if (array[i - 1] != undefined) {
      if (!set.has(array[i - 1])) {
      array[i - 1]  = '--';
      array[i]  = '--';
      }
      else {
      array.splice(i, 1);
      }
    }
    else {
      array.splice(i, 1);
    }
  }

  let double_next = (array, i, set) => {
    if (array[i + 1] != undefined) {
      if (!set.has(array[i + 1])) {
        array[i] = array[i+1]; 
      }
      else {
        array.splice(i, 1);
      }
    }
    else {
      array.splice(i, 1);
    }
  }

  let double_prev = (array, i, set) => {
    if (array[i - 1] != undefined) {
      if (!set.has(array[i - 1])) {
        array[i] = array[i-1];
      }
      else {
      array.splice(i, 1);
      }
    }
    else {
      array.splice(i, 1);
    }
  }

  if (!Array.isArray(arr)) throw Error;
  let set = new Set();
  set.add('--discard-next');
  set.add('--discard-prev');
  set.add('--double-next');
  set.add('--double-prev');

  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  for (let i = 0; i < newArr.length; i++) {
    if (set.has(arr[i])) {
      if (arr[i] === '--discard-next') discard_next(newArr, i, set);
      if (arr[i] === '--discard-prev') discard_prev(newArr, i, set);
      if (arr[i] === '--double-next') double_next(newArr, i, set);
      if (arr[i] === '--double-prev') double_prev(newArr, i, set);
    }
  }
  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i] === '--') {
        newArr.splice(i, 1);
        i--;
    }

  }
  return newArr;
};


