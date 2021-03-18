const nvjson = require("nvjson")


var t = nvjson.jobj2tree(TYPE_DICT);
var leafs = t.$sdfs().filter(r=>r.$is_leaf())
var pls = leafs.map(r=>r.$ances(true).map(r=>r.key))
pls.forEach(pl=>pl.reverse())
pls = pls.map(r=>r.slice(1))
pls.forEach((pl,i)=>{nvjson.set_dict_via_pl(pl,i,TYPE_DICT)})

