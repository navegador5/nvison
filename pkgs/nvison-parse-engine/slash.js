const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;
const LEFTED_TYPE = _STATE.LEFTED_TYPE;
const cfg = require("nvison-cfg");


function handle_cmt_engine(d,handler_name)  {
    let state = d.state;
    let cmtnd = d[handler_name]();
    if(cmtnd === empty) {
    } else {
        let pnd = d.stack.lst;
        if(state === gtv(STATE.bk)) {
           
            pnd.append_ttcmt(cmtnd);

        } else if(state === gtv(STATE.k)) {

           d.$push_kcmt(cmtnd);
           d.state = STATE.ak;

        } else if(state === gtv(STATE.ak)) {

            d.$push_kcmt(cmtnd);
       
        } else if(state === gtv(STATE.bv)) {

            if(pnd.is_ary()) {
                pnd.append_ttcmt(cmtnd);
            } else if(pnd.is_dict()) {
                d.$push_bvcmt(cmtnd);
            } else {
                //impossible
            }        

        } else if(state === gtv(STATE.v)) {

            d.$setup_leafnd();
            d.state = STATE.av;

        } else if(state === gtv(STATE.av)) {
            
            let pnd = d.stack.lst;
            if(pnd.is_ary()){
                pnd.append_ttcmt(cmtnd);
                d.state = STATE.bv;
            } else if(pnd.is_dict()) {
                d.$push_avcmt(cmtnd);
            } else {
               //impossible
            }

        } else {
            //impossible
            //exception states will be terminated in main loop
        }
    }
    return(d)
}


function handle_lc(d) {return(handle_cmt_engine(d,'$handle_lcmt'))}
function handle_blkc(d) {return(handle_cmt_engine(d,'$handle_blkcmt'))}

function handle_others(d) {
    if(state === gtv(STATE.bk)) {
        
        d.$unshift_g();
        d.str_cache.k = cfg.slash;
        d.state = STATE.k;

    } else if(state === gtv(STATE.k)) {

        d.$unshift_g();
        d.str_cache.k = d.str_cache.k + cfg.slash;

    } else if(state === gtv(STATE.ak)) {
          
        d.$unshift_g();
        d.$abandon_key(cfg.slash);
        d.state = STATE.k;

    } else if(state === gtv(STATE.bv)) {

        d.$unshift_g();
        d.str_cache.v = cfg.slash;
        d.state = STATE.v;

    } else if(state === gtv(STATE.v)) {

        d.$unshift_g();
        d.str_cache.v = d.str_cache.v + cfg.slash;

    } else if(state === gtv(STATE.av)) {

        d.$end_av_with_str(cfg.slash,false);

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
}

function handle(d) {
    let state = d.state;
    let ch = d.$next_ch();
    if(d.$is_currch_eof()) {

        d.lefted.data = cfg.slash;
        d.lefted.type = LEFTED_TYPE.backslash;
        d.$handle_main_eof();

    } else if(d.$is_currch_slash()) {
        handle_lc(d);
    } else if(d.$is_currch_asterisk()) {
        handle_blkc(d);
    } else {
        handle_others(d);
    }
    return(d)

}


module.exports = handle
