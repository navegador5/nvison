const {empty} = require("nv-facutil-basic");
const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;

function handle(d) {
    let state = d.state;
    if(state === gtv(STATE.bk)) {
        //do nothing
    } else if(state === gtv(STATE.k)) {

        d.state = STATE.ak;

    } else if(state === gtv(STATE.ak)) {
        //do nothing
    } else if(state === gtv(STATE.bv)) {
        //do nothing 
    } else if(state === gtv(STATE.v)) {
       
        d.$setup_leafnd();
        d.state = STATE.av;

    } else if(state === gtv(STATE.av)) {
         //do nothing    
    } else {
        //impossible
        //exception states will be terminated in main loop
    }
    return(d)
}


module.exports = handle
