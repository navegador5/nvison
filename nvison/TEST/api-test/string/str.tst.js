const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./str.ison");
var should_be = [
  'abc-def',
  'def\tsquoted',
  'd    quoted',
  'tock-quoted-line\ntock-quoted-line',
  'str@auto-concat@str'
]







const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
