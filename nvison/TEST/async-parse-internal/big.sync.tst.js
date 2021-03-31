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


var start = (new Date()).getTime()
var rslt = parse_from_file("./svelte-compiler-3.15.0.json",{enable_ref:false});
var end = (new Date()).getTime()
console.log(end - start)


var orig = fs.readFileSync("./svelte-compiler-3.15.0.json").toString()
orig = JSON.stringify(JSON.parse(orig),null,4);
rslt = JSON.stringify(rslt.value[0],null,4)
console.log(orig === rslt)


