const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


let real = (ison.parse_from_file("./hr1.ison",{enable_ref:true}))
real = JSON.parse(JSON.stringify(real))


var should_be = [
    "https://127.0.0.1/img.jpg",
    "https://127.0.0.1/img.png",
    "this is a very long\nvery long string\n...string",
    [
        "this is a very long\nvery long string\n...string",
        "this is a very long\nvery long string\n...string",
        {
            "div@1": {
                "attribs": {
                    "style": {}
                }
            },
            "div@2": {
                "attribs": {
                    "style": {}
                }
            },
            "div@3": {
                "attribs": {
                    "style": {}
                }
            },
            "div@4": {
                "attribs": {
                    "style": {}
                }
            },
            "img@1": "https://127.0.0.1/img.jpg",
            "img@2": "https://127.0.0.1/img.png"
        },
        {
            "div@1": {
                "attribs": {
                    "style": {}
                }
            },
            "div@2": {
                "attribs": {
                    "style": {}
                }
            },
            "div@3": {
                "attribs": {
                    "style": {}
                }
            },
            "div@4": {
                "attribs": {
                    "style": {}
                }
            },
            "img@1": "https://127.0.0.1/img.jpg",
            "img@2": "https://127.0.0.1/img.png"
        }
    ]
]






const assert = require("assert")
assert.deepStrictEqual(real,should_be)

console.log(real);
