`
[
   (a b c d)
   (e f <g h>)
   (
       <some>
       <some>
       <some>
    )
]
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

var g = sync_gen_from_file("./arr1.json")

const parser = require("nvison-parse-engine")


var pp =parser(g)
var d = (pp.next().value)
var rt = d.avnd_cache.data;
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)

console.log(JSON.stringify(rt.value,null,4))

/*
> rt.value
[
  [
    [ 'a', 'b', 'c', 'd' ],
    [ 'e', 'f', [Array] ],
    [ [Array], [Array], [Array] ]
  ]
]
> rt.value[0][1]
[ 'e', 'f', [ 'g', 'h' ] ]
> rt.value[0][2]
[ [ 'some' ], [ 'some' ], [ 'some' ] ]
>


*/
