const {
    parse_from_generator,
    parse_from_str,
    parse_from_file,
    gen_from_generator,
    gen_from_str,
    gen_from_file,
    agen_from_file
} = require("nvison-parse-internal");

const {
    sync_gen_from_str,
    sync_gen_from_file,
    async_gen_from_file
} = require("nv-string-stream");


//var ag = agen_from_file("./hash-and-ref.strid.json");

const fs = require('fs')

var count = 0
var intr = setInterval(
    ()=>{console.log(count);count=count+1;},
    3000
)

var ag = agen_from_file("./svelte-compiler-3.15.0.json",{enable_ref:false});
var rslt=0; 


(async () => {
    console.log(new Date())
    for await (let nd of ag) { 
        rslt =nd
        nd =null
    }
    console.log(rslt)
    console.log(new Date())
    console.log(rslt.$edfs().length);
    var orig = fs.readFileSync("./svelte-compiler-3.15.0.json").toString()
    orig = JSON.stringify(JSON.parse(orig),null,4);
    rslt = JSON.stringify(rslt.value[0],null,4)
    console.log(orig === rslt)
    clearInterval(intr)
})();


