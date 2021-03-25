const {empty} = require("nv-facutil-basic");

const CFG = require("nvison-cfg");

const internal  = require("nvison-parse-internal");

function _wrap_rslt(rslt) {
    if(rslt.length === 1) {
        return(rslt[0])
    } else {
        return(rslt)
    }
}

function _add_parse_func_to_mod() {
    for(let k in internal) {
        let _f;
        if(k.startsWith("gen_")) {
            _f = function * (fst,opt={enable_ref:false,encoding:'utf8'}) {
                let g = internal[k](fst,opt)
                for(let rslt of g) {
                    rslt = _wrap_rslt(rslt)
                    yield([rslt.key,rslt.value])
                }
            }            
        } else if(k.startsWith("agen_")) {
            _f = async function * (fst,opt={enable_ref:false,encoding:'utf8'}) {
                let ag = internal[k](fst,opt)
                for await(let rslt of ag) {
                    rslt = _wrap_rslt(rslt)
                    yield([rslt.key,rslt.value])
                }
            }
        } else {
            _f = function (fst,opt={enable_ref:false,encoding:'utf8'}) {
                let rslt = internal[k](fst,opt).value;
                return(_wrap_rslt(rslt))
            }
        }
        Object.defineProperty(_f,'name',{value:k})
        module.exports[k] = _f
    }
    module.exports.OPT_DICT = internal.OPT_DICT;
}

_add_parse_func_to_mod();

module.exports.CFG = CFG;
module.exports.empty = empty;

