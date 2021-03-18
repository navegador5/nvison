const {nvjson} = require("nvjson")
const {append} = require("nv-string-basic")

var t = nvjson.jobj2tree(STATE_DICT);
var leafs = t.$sdfs().filter(r=>r.$is_leaf())
var codes = leafs.map(r=>r.$ances(true).map(x=>x.$sibseq()))
codes.forEach(r=>r.reverse())
codes = codes.map(r=>r.slice(1))
var width = Math.max(...codes.map(r=>r.length))

pls.forEach((pl,i)=>{nvjson.set_dict_via_pl(pl,i,STATE_DICT)})

