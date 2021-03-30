const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


let real = (ison.parse_from_file("./k-ref.ison",{enable_ref:true}))

let should_be = [ 'keyname', 'alias', { keyname: 'v0' }, { keyname: 'v0' } ] 
 
 
const assert = require("assert");
assert.deepStrictEqual(real,should_be);
console.log(real);
