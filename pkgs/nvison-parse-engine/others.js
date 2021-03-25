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

        d.$refresh_key();
        d.state = STATE.k;

    } else if(state === gtv(STATE.bv)) {
    
        d.str_cache.v = d.ch_cache.curr;
        d.state = STATE.v;

    } else if(state === gtv(STATE.v)) {
        
        d.str_cache.v = d.str_cache.v + d.ch_cache.curr;
        d.str_cache.maybe_vquote = empty;

    } else if(state === gtv(STATE.av)) {
        

        d.$mv_avcmt_to_avcmt();
        d.$change_state_when_end_av();
        d.__unshift_g(d.ch_cache.curr);

       

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


module.exports = handle
