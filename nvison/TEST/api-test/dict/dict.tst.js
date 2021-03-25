const ison = require("/opt/JS/NV5_/nvison/nvison/index");

ison.CFG.obj_blks.add("^","$")
console.log(JSON.stringify(ison.parse_from_file("./dict.ison"),null,2))

