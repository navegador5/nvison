`
{
    normal-num: [175 0x1101 0b1101 0o1101 -123.12e3 -1.1e2.5 .1E3.13] 
    special-num: [+Infinity; -Infinity; NaN];
    bigint: [1234567891234567889123456789n,1234567891234567889123456789n],
    str-str : [abc, 'def\tsquoted'; "d    quoted" `tock-quoted`];
    str"@concat@"str  :  prefix"\t\v\b"suffix
}
`

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

var g = sync_gen_from_file("./primitive.json")

const parser = require("nvison-parse-engine")


var pp =parser(g)
var d = (pp.next().value)
var rt = d.avnd_cache.data;
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}


d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)

//console.log(JSON.stringify(rt.value,null,4))

/*
> rt.value
[
  {
    'normal-num': [
      175,
      4353,
      13,
      577,
      -123120,
      -347.85054261852173,
      134.89628825916535
    ],
    'special-num': [ Infinity, -Infinity, NaN ],
    bigint: [ 1234567891234567889123456789n, 1234567891234567889123456789n ],
    'str-str': [ 'abc', 'def\tsquoted', 'd    quoted', 'tock-quoted' ],
    'str@concat@str': 'prefix\t\x0B\bsuffix'
  }
]
>

*/
