const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;

function handle(d) {
    let state = d.state;
    let rslt = d.$handle_quote();
    if(rslt === empty) {
    } else {
        if(state === gtv(STATE.bk)) {
           
           d.str_cache.k = rslt;
           d.state = STATE.k

        } else if(state === gtv(STATE.k)) {

           d.str_cache.k = d.str_cache.k + rslt;

        } else if(state === gtv(STATE.ak)) {

           d.$abandon_key(rslt);

        } else if(state === gtv(STATE.bv)) {

           d.str_cache.v = rslt;
           d.state = STATE.v;

        } else if(state === gtv(STATE.v)) {
           
           d.str_cache.v = d.str_cache.v + rslt;

        } else if(state === gtv(STATE.av)) {
          
           d.$end_av_with_str(rslt); 
          
        } else {
            //impossible
            //exception states will be terminated in main loop
        }
    }
    return(d)
}


module.exports = handle
