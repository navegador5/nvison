const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./number.ison");
var should_be = [
  175,
  4353,
  13,
  577,
  -123120,
  -347.85054261852173,
  134.89628825916535,
  1234567891234567889123456789n,
  Infinity,
  -Infinity,
  NaN
]






const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
