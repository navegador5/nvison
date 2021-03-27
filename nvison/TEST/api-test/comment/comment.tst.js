const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


var real = ison.parse_from_file("./comment.ison");
var should_be = {
    "total_rows": 129,
    "offset": 0,
    "rows": [
        {
            "id": "change1_0.6995461115147918",
            "key": "change1_0.6995461115147918",
            "value": {
                "rev": "1-e240bae28c7bb3667f02760f6398d508"
            },
            "doc": {
                "_id": "change1_0.6995461115147918",
                "_rev": "1-e240bae28c7bb3667f02760f6398d508",
                "hello": 1
            }
        }
    ]
}


const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
