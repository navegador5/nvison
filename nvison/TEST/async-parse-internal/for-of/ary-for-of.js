const fs = require('fs');
const perf_hooks = require("perf_hooks");

function tst(times,f,...args) {
    let start = perf_hooks.performance.nodeTiming.duration
    c= 0
    while(c<times) {f(...args);c=c+1}
    let end = perf_hooks.performance.nodeTiming.duration
    console.log(end-start)
}

//var buf = fs.readFileSync("../../../nvison/TEST/async-parse-internal/svelte-compiler-3.15.0.json");
//var str = buf.toString('utf8');
var str = fs.readFileSync("../../../nvison/TEST/async-parse-internal/svelte-compiler-3.15.0.json",'utf8');
var ary = Array.from(str,r=>r.codePointAt(0));
//var codes = 


function ary_for_of(arr) { 
    let count = 0
    for(let ch of arr) {count = count +1}
    console.log(count)
}

tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)
tst(1,ary_for_of,ary)

