const ison = require("/opt/JS/NV5_/nvison/nvison/index")


var should_be = [
  'abc-def',
  'def\tsquoted',
  'd    quoted',
  'tock-quoted-line\ntock-quoted-line',
  'str@auto-concat@str'
]

console.log(ison.parse_from_file("./str.ison"))
