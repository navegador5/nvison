const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;

function handle(d,quote) {
    let state = d.state;
    let rslt = d.$handle_quote();
    if(rslt === empty) {
        //quote-eof
    } else {
        if(state === gtv(STATE.bk)) {
           
           d.str_cache.k = rslt;
           d.state = STATE.k

        } else if(state === gtv(STATE.k)) {

           d.str_cache.k = d.str_cache.k + rslt;

        } else if(state === gtv(STATE.ak)) {

           d.$refresh_key(rslt);
           d.state = STATE.k;

        } else if(state === gtv(STATE.bv)) {
           
           d.str_cache.maybe_vquote = quote;
           d.str_cache.v = rslt;
           d.state = STATE.v;

        } else if(state === gtv(STATE.v)) {
           
           d.str_cache.v = d.str_cache.v + rslt;
           d.str_cache.maybe_vquote = empty;

        } else if(state === gtv(STATE.av)) {
         
           d.$mv_avcmt_to_avcmt();
           d.$change_state_when_end_av(rslt,quote);
        } else {
            //impossible
            //exception states will be terminated in main loop
        }
    }
    return(d)
}


module.exports = handle
