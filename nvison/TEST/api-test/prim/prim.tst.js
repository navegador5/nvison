const ison = require("/opt/JS/NV5_/nvison/nvison/index");

const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./prim.ison");
var should_be = [
    true,
    false,
    null,
    undefined
]








const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);


