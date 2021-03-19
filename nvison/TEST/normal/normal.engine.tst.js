/*
{
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
        },
        {
            "id": "change2_0.6995461115147918",
            "key": "change2_0.6995461115147918",
            "value": {
                "rev": "1-13677d36b98c0c075145bb8975105153"
            },
            "doc": {
                "_id": "change2_0.6995461115147918",
                "_rev": "1-13677d36b98c0c075145bb8975105153",
                "hello": 2
            }
        }
    ]
}


*/

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

var g = sync_gen_from_file("./normal.json")

const parser = require("nvison-parse-engine")


var pp =parser(g)
var d = (pp.next().value)
var rt = d.avnd_cache.data.$parent()
for(let i=0;i<5;i++) {d = (pp.next().value)}
for(let i=0;i<4;i++) {d = (pp.next().value)}
for(let i=0;i<3;i++) {d = (pp.next().value)}

for(let i=0;i<8;i++) {d = (pp.next().value)}
for(let i=0;i<8;i++) {d = (pp.next().value)}
for(let i=0;i<7;i++) {d = (pp.next().value)}

for(let i=0;i<2;i++) {d = (pp.next().value)}

for(let i=0;i<4;i++) {d = (pp.next().value)}

for(let i=0;i<36;i++) {d = (pp.next().value)}

for(let i=0;i<8;i++) {d = (pp.next().value)}

for(let i=0;i<64;i++) {d = (pp.next().value)}

for(let i=0;i<4;i++) {d = (pp.next().value)}
for(let i=0;i<4;i++) {d = (pp.next().value)}

for(let i=0;i<3;i++) {d = (pp.next().value)}

d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)

console.log(JSON.stringify(rt.value,null,4))
