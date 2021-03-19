const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;

function handle(d) {
    let state = d.state;
    if(state === gtv(STATE.bk)) {
        
        d.str_cache.k = d.ch_cache.curr;
        d.state = STATE.k;
    
    } else if(state === gtv(STATE.k)) {

        d.str_cache.k = d.str_cache.k + d.ch_cache.curr;

    } else if(state === gtv(STATE.ak)) {

        d.$abandon_key();

    } else if(state === gtv(STATE.bv)) {

        d.$open_nonleaf_nd();

    } else if(state === gtv(STATE.v)) {
        
        let pnd = d.stack.lst;
        d.$setup_leafnd();
        if(pnd.is_ary()) {
            d.$open_nonleaf_nd();
        } else if(pnd.is_dict()) {
            d.str_cache.k = d.ch_cache.curr;
            d.state = STATE.k;
        } else {
            //impossible
        }

    } else if(state === gtv(STATE.av)) {
        
        let pnd = d.stack.lst;
        d.$mv_avcmt_to_avcmt();
        d.$clear_avnd_cache();
        if(pnd.is_ary()) {
            d.$open_nonleaf_nd();
        } else if(pnd.is_dict()) {
            d.str_cache.k = d.ch_cache.curr;
            d.state = STATE.k;
        } else {
            //impossible
        }

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


module.exports = handle
