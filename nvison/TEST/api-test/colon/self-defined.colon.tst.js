const ison = require("/opt/JS/NV5_/nvison/nvison/index")
ison.CFG.colons.add("|")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./self-defined.colon.ison");
var should_be = { a: 'b', c: 'd', e: 'f' }

const assert = require("assert");
assert.deepStrictEqual(real,should_be);
console.log(real);

