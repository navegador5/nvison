const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


let real = (ison.parse_from_file("./v-ref.ison",{enable_ref:true}))
let should_be = [ 'value', [ 100, 200, 'value' ], { k: 300, value: 'v1' } ] 

const assert = require("assert");
assert.deepStrictEqual(real,should_be);
console.log(real);
