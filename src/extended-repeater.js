const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  let newString = '';
  if (typeof str != 'string') str = '' + str;
  if (options === undefined) {
    let options = {};
    options.repeatTimes = 0;
    options.separator = '+';
    options.addition = '';
    options.additionRepeatTimes = 0;
    options.additionSeparator = '|';
  }
  if (options.separator === undefined) options.separator = '+';
  if (options.additionSeparator === undefined) options.additionSeparator = '|';
  if (options.repeatTimes === undefined && options.additionRepeatTimes === undefined) newString += str + options.addition;
  for (let i = 0; i < options.repeatTimes; i++) {
    newString += str;
    if (options.additionRepeatTimes != 0 && options.additionRepeatTimes != undefined) {
       for (let j = 0; j < options.additionRepeatTimes; j++) {
        newString += (j == options.additionRepeatTimes - 1) ?   options.addition : options.addition + options.additionSeparator;
      }
    }
    newString += (i == options.repeatTimes - 1) ? '' : options.separator;
  }
  return newString;
};