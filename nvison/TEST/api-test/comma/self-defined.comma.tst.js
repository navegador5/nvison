const ison = require("/opt/JS/NV5_/nvison/nvison/index")
ison.CFG.commas.add("。")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./self-defined.comma.ison");
var should_be = [
  'i',  'you', 'he',
  'yo', 'tú',  'Él',
  '我', '你',  '他'
]




const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
