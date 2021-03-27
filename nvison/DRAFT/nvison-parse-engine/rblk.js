const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;


function nomatch_handle(d) {
    let state = d.state;
    if(state === gtv(STATE.bk)) {

        d.str_cache.k = d.ch_cache.curr;
        d.state = STATE.k;

    } else if(state === gtv(STATE.k)) {

        d.str_cache.k = d.str_cache.k + d.ch_cache.curr;

    } else if(state === gtv(STATE.ak)) {

        d.$refresh_key(d.ch_cache.curr);
        d.state = STATE.k;

    } else if(state === gtv(STATE.bv)) {

        d.str_cache.v = d.ch_cache.curr;
        d.state = STATE.v;

    } else if(state === gtv(STATE.v)) {

        d.str_cache.v = d.str_cache.v + d.ch_cache.curr;
        d.str_cache.maybe_vquote = empty;

    } else if(state === gtv(STATE.av)) {

        d.$mv_avcmt_to_avcmt();
        d.$change_state_when_end_av(d.ch_cache.curr);

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}

function match_handle(d) {
    let state = d.state;
    if(state === gtv(STATE.bk)) {
    
        d.$close_nonleaf_nd();
  
    } else if(state === gtv(STATE.k)) {

        d.str_cache.k =empty;
        d.$close_nonleaf_nd();


    } else if(state === gtv(STATE.ak)) {

        d.$refresh_key();
        d.str_cache.k =empty;
        d.$close_nonleaf_nd();

    } else if(state === gtv(STATE.bv)) {

        d.$abandon_key_when_end_bv();
        d.$close_nonleaf_nd();

    } else if(state === gtv(STATE.v)) {

        d.$setup_leafnd();
        d.state = STATE.av;
        d.__unshift_g(d.ch_cache.curr);


    } else if(state === gtv(STATE.av)) {
        if(!d.$has_yield_sign()) {
            d.$mv_avcmt_to_avcmt();
            d.$set_yield_sign();
            d.__unshift_g(d.ch_cache.curr);
        } else {
            d.$clear_yield_sign();
            d.$close_nonleaf_nd();
        }
    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


function handle(d) {
    let cond = d.$is_rblk_match();
    if(cond) {
        match_handle(d)
    } else {
        nomatch_handle(d);
    }
    return(d)
}


module.exports = handle
