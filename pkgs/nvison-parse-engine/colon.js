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
        
        d.$setup_leafnd();//maybe_vquote label will be handled
        d.$change_state_when_end_av();

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
