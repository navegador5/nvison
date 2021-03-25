const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;
const LEFTED_TYPE = _STATE.LEFTED_TYPE;
const AVND_CACHE_STATE_DICT = _STATE.AVND_CACHE_STATE_DICT;

const typdef = require("nvison-obj-typedef");
const cfg = require("nvison-cfg");
const scope = require("nvison-parse-scope");


const {
    sync_gen_from_str,
    sync_gen_from_file
} = require("nv-string-stream");


const parser = require("nvison-parse-engine")

var g = sync_gen_from_file("./hash-and-ref.strid.json")

var pp =parser(g)
var d = (pp.next().value)
var rt = d.avnd_cache.data
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<30;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<14;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
rt.value[3][2]['div@1'] === rt.value[3][2]['div@2']

for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}


d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)

console.log(JSON.stringify(rt.value,null,4))

/*

rt.value

[
    "https://127.0.0.1/img.jpg",
    "https://127.0.0.1/img.png",
    "this is a very long \nvery long string\n...string",
    [
        "this is a very long \nvery long string\n...string",
        "this is a very long \nvery long string\n...string",
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
            "img@2": "https://127.0.0.1/img.jpg"
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
            "img@2": "https://127.0.0.1/img.jpg"
        }
    ]
]



*/
