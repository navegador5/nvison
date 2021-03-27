const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./comma.ison");
var should_be = [
  [ 1, 2, 3, 'a', 'b', 'c' ],
  [ 1, 2, 3, 'a', 'b', 'c' ],
  [ 1, 2, 3, 'a', 'b', 'c' ],
  [ 1, 2, 3, 'a', 'b', 'c' ],
  [ 1, 2 ],
  { a: 'b' }
]



const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
