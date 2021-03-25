const ison = require("/opt/JS/NV5_/nvison/nvison/index");
ison.CFG.quotes.add("%");

console.log(ison.parse_from_file("quote.ison"));
