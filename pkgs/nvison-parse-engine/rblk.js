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

        d.$abandon_key(d.ch_cache.curr);

    } else if(state === gtv(STATE.bv)) {

        d.str_cache.v = d.ch_cache.curr;
        d.state = STATE.v;

    } else if(state === gtv(STATE.v)) {

        d.str_cache.v = d.str_cache.v + d.ch_cache.curr;

    } else if(state === gtv(STATE.av)) {

        d.$end_av_with_str(d.ch_cache.curr);

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

        d.$abandon_key();
        d.str_cache.k =empty;
        d.$close_nonleaf_nd();

    } else if(state === gtv(STATE.bv)) {

        d.str_cache.k =empty;
        d.cmt_cache.kcmt = [];
        d.cmt_cache.bvcmt = [];
        d.$close_nonleaf_nd()

    } else if(state === gtv(STATE.v)) {

        d.$setup_leafnd();
        d.$close_nonleaf_nd();

    } else if(state === gtv(STATE.av)) {
      
        d.$mv_avcmt_to_avcmt();
        d.$clear_avnd_cache();
        d.$close_nonleaf_nd();

    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


function handle(d) {
    let cond = $is_rblk_match();
    if(cond) {
        match_handle(d)
    } else {
        nomatch_handle(d);
    }
    return(d)
}


module.exports = handle
