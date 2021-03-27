const ison = require("/opt/JS/NV5_/nvison/nvison/index")



const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./hr0.ison",{enable_ref:true});
var should_be = {
  arr: [ 1, 2, 3, 4 ],
  x: [ 1, 2, 3, 4 ],
  y: {
    k0: 'abcdefghijklmnopqrstuvwxyz',
    k1: [ 1, 2, 3, 4 ],
    k2: [ 1, 2, 3, 4 ],
    k3: 'abcdefghijklmnopqrstuvwxyz',
    k4: 'abcdefghijklmnopqrstuvwxyz'
  }
}





const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
