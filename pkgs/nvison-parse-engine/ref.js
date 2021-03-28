const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;
const cfg = require("nvison-cfg");

function handle(d) {
    let state = d.state;
    let rslt = d.$get_hash_or_ref(cfg.ref);
    if(rslt === empty) {
        //ref-eof
    } else {
        let refnd = d.$find_ref(rslt);
        if(refnd === empty) {
            //do-nothing
        } else {
            let pnd = d.stack.lst;
            if(state === gtv(STATE.bk)) {
                 
                 d.str_cache.k = refnd.vto_rawstr();
                 d.state = STATE.ak;
                 
            } else if(state === gtv(STATE.k)) {

                d.str_cache.k = d.str_cache.k + refnd.vto_rawstr();


            } else if(state === gtv(STATE.ak)) {

                d.$refresh_key(refnd.vto_rawstr())
                d.state = STATE.ak;

            } else if(state === gtv(STATE.bv)) {
                 
                d.$add_ref_to_parent(refnd);
                d.state = STATE.av;
            } else if(state === gtv(STATE.v)) {
              
                d.str_cache.v = d.str_cache.v + refnd.vto_rawstr();
                d.str_cache.maybe_vquote = empty;
                d.$setup_leafnd();
                d.state = STATE.av;

            } else if(state === gtv(STATE.av)) {
                if(!d.$has_yield_sign()) {
                    d.$mv_avcmt_to_avcmt();
                    d.$set_yield_sign();
                } else {
                    d.$clear_yield_sign();
                    if(pnd.is_ary()) {
                        
                        d.$add_ref_to_parent(refnd);
                        d.state = STATE.av;

                    } else if(pnd.is_dict()) {
                    
                        d.str_cache.k = refnd.vto_rawstr();
                        d.state = STATE.ak;
                    
                    } else {
                        //impossible
                    }
                }
              
            } else {
                //impossible
                //exception states will be terminated in main loop
            }
        }
    }
    return(d)
}


module.exports = handle
