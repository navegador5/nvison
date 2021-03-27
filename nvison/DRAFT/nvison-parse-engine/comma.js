const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;

function handle(d) {
    let state = d.state;
    if(state === gtv(STATE.bk)) {
        //do nothing
    } else if(state === gtv(STATE.k)) {

        d.str_cache.k = empty;
        d.state = STATE.bk;

    } else if(state === gtv(STATE.ak)) {

        d.str_cache.k = empty;
        d.state = STATE.bk;

    } else if(state === gtv(STATE.bv)) {

        d.abandon_key_when_end_bv();
        let pnd = d.stack.lst;
        pnd.is_ary()?d.state = STATE.bv : d.state = STATE.bk;

    } else if(state === gtv(STATE.v)) {
        
        //v-to-bk or v-to-bv
        d.$setup_leafnd();
        d.$change_state_when_end_av();

    } else if(state === gtv(STATE.av)) {
        
        d.$mv_avcmt_to_avcmt();
        d.$change_state_when_end_av();

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


module.exports = handle
