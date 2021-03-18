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

        d.cmt_cache.kcmt = [];
        d.cmt_cache.bvcmt = [];
        d.str_cache.k = empty;
        d.state = STATE.bk;

    } else if(state === gtv(STATE.v)) {
        
        d.setup_leafnd();
        d.$change_state_when_end_av();

    } else if(state === gtv(STATE.av)) {
        
        d.$mv_avcmt_to_avcmt();
        d.$clear_avnd_cache();
        d.$change_state_when_end_av();

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


module.exports = handle
