const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;
const cfg = require("nvison-cfg");


function handle(d) {
    let state = d.state;
    let rslt = d.$get_hash_or_ref(cfg.hash);
    if(rslt === empty) {
    } else {
        let cond = d.$is_hash_of_pnd();
        let pnd = d.stack.lst;
        if(state === gtv(STATE.bk)) {
            
            if(cond) {pnd.hashes.add(rslt);} else {}

        } else if(state === gtv(STATE.k)) {

            d.$push_kcmt(rslt);
            d.state = STATE.ak;
           
        } else if(state === gtv(STATE.ak)) {

            d.$push_kcmt(rslt);

        } else if(state === gtv(STATE.bv)) {
           
            if(cond) {pnd.hashes.add(rslt);} else {}

             
        } else if(state === gtv(STATE.v)) {
           
            d.$setup_leafnd();
            let nd = d.avnd_cache.data;
            nd.hashes.add(rslt);

        } else if(state === gtv(STATE.av)) {
         
            let nd = d.avnd_cache.data;
            nd.hashes.add(rslt);
          
        } else {
            //impossible
            //exception states will be terminated in main loop
        }
    }
    return(d)
}


module.exports = handle
