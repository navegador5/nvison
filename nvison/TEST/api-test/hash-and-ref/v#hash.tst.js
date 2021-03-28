const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


let real = (ison.parse_from_file("./v#hash.ison",{enable_ref:true}))
let should_be = [ [ 100, 200, 200 ], [ 100, 200, 200 ], [ 100, 200, 200 ] ]

const assert = require("assert");
assert(real,should_be);
console.log(real);
