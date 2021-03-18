const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;

function handle(d) {
    let state = d.state;
    if(state === gtv(STATE.bk)) {
        //do nothing
    } else if(state === gtv(STATE.k)) {

        d.state = STATE.bv;

    } else if(state === gtv(STATE.ak)) {

        d.state = STATE.bv;

    } else if(state === gtv(STATE.bv)) {
        //do nothing 
    } else if(state === gtv(STATE.v)) {
        
        d.str_cache.v = d.str_cache.v + d.ch_cache.curr;

    } else if(state === gtv(STATE.av)) {
        
        d.$end_av_with_str(empty,true)

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


module.exports = handle
