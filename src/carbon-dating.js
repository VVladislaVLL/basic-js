const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY= 15; 
const HALF_LIFE_PERIOD= 5730;

module.exports = function dateSample(sampleActivity) {
  if (typeof sampleActivity != 'string') return false;
  if (isNaN(+sampleActivity)) return false;
  if (+sampleActivity < 0) return false;
  let year = Math.ceil(HALF_LIFE_PERIOD*Math.log2(MODERN_ACTIVITY/ +sampleActivity))
  return  (year === Infinity || year < 0) ? false : year;
};
