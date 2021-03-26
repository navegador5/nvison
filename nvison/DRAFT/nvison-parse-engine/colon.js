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
        // [abc:] {k:abc:} treat as normal char
        d.str_cache.maybe_vquote = empty;
    } else if(state === gtv(STATE.av)) {

        d.$mv_avcmt_to_avcmt();
        //bk or bv depends on pnd type
        d.$change_state_when_end_av();

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


module.exports = handle
