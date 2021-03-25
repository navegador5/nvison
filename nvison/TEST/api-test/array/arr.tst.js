const ison = require("/opt/JS/NV5_/nvison/nvison/index");

ison.CFG.array_blks.add("【","】")
ison.CFG.array_blks.add("《","》")
console.log(JSON.stringify(ison.parse_from_file("./arr.ison"),null,2))

