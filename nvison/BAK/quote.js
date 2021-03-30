const char_ws = require("nv-char-whitespace");
const cfg = require("nvison-cfg");
const {
    STATE_DICT,
    TYPE_DICT,
} = require("./cmmn");

const char_esc = require("nv-char-escape").cmmn;
const {sync_gen_from_str} = require("nv-string-stream");

function take_tok(d,cursor,state) {
    d.state = state;
    d.cache.ei = cursor.curr;
    d.toks.push(cache.tok());
    return(d);
}

function task_esc(cursor,ch)


function handle(d,cursor,ch,input) {
    if(ch === cfg.esc) {
        d.state = STATE_DICT.esc;
        d.pstate = STATE_DICT.quote;
    } else if(ch === d.quote) {

        if(d.pstate!==undefined) {
            d.state = d.pstate;
            d.pstate = undefined;
        } else {
            return(take_tok(d,cursor,STATE_DICT.init))
        }
    } else {
    }
}


module.exports = handle;
