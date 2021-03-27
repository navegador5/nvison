const ison = require("/opt/JS/NV5_/nvison/nvison/index");

ison.CFG.array_blks.add("【","】")
ison.CFG.array_blks.add("《","》")





const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./arr.ison");
var should_be = [
  "defun",
  "last-state",
  [
    "rewindable"
  ],
  [
    "let",
    [
      [
        "size",
        [
          "rewind-count",
          "rewindable"
        ]
      ]
    ],
    [
      "if",
      [
        "zerop",
        "size"
      ],
      [
        "values",
        "nil",
        "nil"
      ],
      [
        "values",
        [
          "aref",
          [
            "rewind-store",
            "rewindable"
          ],
          [
            1,
            "-",
            "size"
          ]
        ],
        "t"
      ]
    ]
  ]
]



const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
