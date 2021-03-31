const ison = require("/opt/JS/NV5_/nvison/nvison/index");

ison.CFG.obj_blks.add("【","】")





const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./rblk.ison");

var should_be = [
  { k0: 'v0' },
  { k1: 'v1' },
  { ey: 'value' },
  { k2: 'v2' },
  { k3: 'v3' },
  { k4: 'v4' },
  { k5: 'v' },
  { k5: 'v5', k6: 'v6' },
  [ 'v0' ],
  [ 'v', 'alue' ],
  [ 'v0', 'v1' ]
]
 

const assert = require("assert")
assert.deepStrictEqual(real,should_be)
console.log(real);
