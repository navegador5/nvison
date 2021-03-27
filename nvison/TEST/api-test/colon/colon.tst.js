const ison = require("/opt/JS/NV5_/nvison/nvison/index")
const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./colon.ison");
var should_be = [
  { a: 'b', c: 'd', e: 'f' },
  { a: 'b', c: 'd', e: 'f' },
  { a: 'b', c: 'd', e: 'f', g: 'h' },
  { a: 'b', key: 'value' },
  { a: 'b', key: 'value' },
  { a: 'b', key: 'value' },
  [ 100, 'xy' ],
  [ 'abc', 123 ],
  { k: 'abc', k3: 'v3' },
  { k: 'abc', k3: 'v3' },
  { k: 'abc', k3: 'v3' },
  { k: 'abc', k2: 'v2' },
  [ 'abc', 666 ],
  { '100': 200, k: 'v', key: 'value' }
]
 


const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
