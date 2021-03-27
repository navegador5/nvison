const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;

function handle(d) {
    let state = d.state;
    if(state === gtv(STATE.bk)) {
        //do nothing      { a:b, : }  skip -> {a:b,@before_key}
    } else if(state === gtv(STATE.k)) {
        // {key:@before_val}
        d.state = STATE.bv;
    } else if(state === gtv(STATE.ak)) {
        // {key  :@before_val}
        d.state = STATE.bv;
    } else if(state === gtv(STATE.bv)) {
        //do nothing [100, :] -> [100, @before_val] 
    } else if(state === gtv(STATE.v)) {
        // [abc:,123] -> [ 'abc:', 123 ] 
        // {k:abc:} -> { k: 'abc:' }
        // treat as normal char
        d.str_cache.maybe_vquote = empty;
    } else if(state === gtv(STATE.av)) {
        //skip 
        //[abc : 666]-> [ 'abc', 666 ]
        //{k:v, key:value  : 100:200} -> { '100': 200, k: 'v', key: 'value' }
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
