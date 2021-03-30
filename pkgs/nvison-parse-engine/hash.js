const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;
const cfg = require("nvison-cfg");
const {CommentLine} = require("nvison-obj-class");

function handle(d) {
    let state = d.state;
    let rslt = d.$get_hash_or_ref(cfg.hash);
    if(rslt === empty) {
        //hash-eof
    } else {
        let pnd = d.stack.lst;
        if(state === gtv(STATE.bk)) {
        
            if(d.$is_hash_of_pnd()) {pnd.hashes.add(rslt);} else {}

        } else if(state === gtv(STATE.k)) {
        
            let cmtnd = new CommentLine(rslt)
            d.$push_kcmt(cmtnd);
            d.state = STATE.ak;
           
        } else if(state === gtv(STATE.ak)) {
            
            let cmtnd = new CommentLine(rslt)
            d.$push_kcmt(cmtnd);

        } else if(state === gtv(STATE.bv)) {
           
            if(
                d.$is_hash_of_pnd() &&
                pnd.is_ary()
            ) {pnd.hashes.add(rslt);} else {}

             
        } else if(state === gtv(STATE.v)) {
           
            d.$setup_leafnd();
            let nd = d.avnd_cache.data;
            nd.hashes.add(rslt);
            d.state = STATE.av;

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
