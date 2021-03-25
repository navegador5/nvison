const ison = require("/opt/JS/NV5_/nvison/nvison/index")
ison.CFG.commas.add("。")

console.log(ison.parse_from_file("./self-defined.comma.ison"))

