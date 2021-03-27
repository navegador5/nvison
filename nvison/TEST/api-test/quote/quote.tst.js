const path = require("path");
console.log(path.resolve(__dirname,__filename))

const ison = require("/opt/JS/NV5_/nvison/nvison/index");
ison.CFG.quotes.add("%");


var real = ison.parse_from_file("quote.ison");

var should_be = [
    [ 'a\t\x0B\tb', 'cde', 'fgh', 'ijk', 'lmnopq', 'rst \n uvw \n xyz' ],
    { k0: 'v0'}
]

const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
