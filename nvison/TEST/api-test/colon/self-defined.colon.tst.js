const ison = require("/opt/JS/NV5_/nvison/nvison/index")
ison.CFG.colons.add("|")

console.log(ison.parse_from_file("./self-defined.colon.ison"))

