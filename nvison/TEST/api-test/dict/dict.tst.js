const ison = require("/opt/JS/NV5_/nvison/nvison/index");

ison.CFG.obj_blks.add("^","$")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./dict.ison");
var should_be = {
  "a": "b",
  "c": "d",
  "e": {
    "f": [
      1,
      2,
      3
    ],
    "g": {
      "key": "g",
      "value": 200
    }
  }
}




const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);



