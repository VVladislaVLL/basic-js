const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr123) {
  const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
  let arr = clone(arr123)

  let discard_next = (array, i, set) => {
    if (array[i + 1] != undefined) {
      if (!set.has(array[i + 1])) {
        array[i]  = '--';
        array[i + 1]  = '--';
        return i + 2;
      }
      else {
        array.splice(i, 1);
        return i;
      }
    }
    else {
      array.splice(i, 1);
      return i;
    }
    return i;
  }

  let discard_prev = (array, i,set) => {
    if (array[i - 1] != undefined) {
      if (!set.has(array[i - 1])) {
        array[i - 1]  = '--';
        array[i]  = '--';
        return i + 1;
      }
      else {
      array.splice(i, 1);
      return i;
      }
    }
    else {
      array.splice(i, 1);
      return i;
    }
    return i;

  }

  let double_next = (array, i, set) => {
    if (array[i + 1] != undefined) {
      if (!set.has(array[i + 1])) {
        array[i] = array[i+1];
        return i + 1;
      }
      else {
        array.splice(i, 1);
        return i;
      }
    }
    else {
      array.splice(i, 1);
      return i;
    }
    return i;

  }

  let double_prev = (array, i, set) => {
    if (array[i - 1] != undefined) {
      if (!set.has(array[i - 1])) {
        array[i] = array[i-1];
        return i + 1;
      }
      else {
      array.splice(i, 1);
      return i;
      }
    }
    else {
      array.splice(i, 1);
      return i;      
    }
    return i;

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

  let i = 0;
  while(i < newArr.length) {
    if (set.has(newArr[i])) {
      if (newArr[i] === '--discard-next') i = discard_next(newArr, i, set);
      if (newArr[i] === '--discard-prev') i = discard_prev(newArr, i, set);
      if (newArr[i] === '--double-next') i = double_next(newArr, i, set);
      if (newArr[i] === '--double-prev') i = double_prev(newArr, i, set);
    }
    else {
      i++;
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

