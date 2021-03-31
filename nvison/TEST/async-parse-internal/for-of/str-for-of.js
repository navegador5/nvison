const fs = require("fs");
const perf_hooks = require("perf_hooks");

function tst(times,f,...args) {
    let start = perf_hooks.performance.nodeTiming.duration
    c= 0
    while(c<times) {f(...args);c=c+1}
    let end = perf_hooks.performance.nodeTiming.duration
    console.log(end-start)
}

var buf = fs.readFileSync("../../../nvison/TEST/async-parse-internal/svelte-compiler-3.15.0.json");
var str = buf.toString('utf8');
//var codes = 

function buf_for_of(buf) { 
    for(let ch of buf) {}
}

function str_for_of(s) { 
    let count = 0
    for(let ch of s) {count = count +1}
    console.log(count)
}


tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
tst(1,str_for_of,str)
