const char_ws = require("nv-char-whitespace");
const cfg = require("nvison-cfg");

const {
    STATE_DICT,
    TYPE_DICT,
    take_operator,
    open_quote,
    open_word,
} = require("./cmmn");


function handle(d,cursor,ch) {
    if(char_ws.is_ws(ch)) {

    } else if(ch === cfg.slash) {
        d.state = STATE_DICT.slash;
    } else if(cfg.quotes.has(ch)) {
        open_quote(d,cursor,ch);
    } else if(ch === cfg.hash) {
        d.state = STATE_DICT.hash;
    } else if(ch === cfg.ref) {
        d.state = STATE_DICT.ref;
    } else if(cfg.colons.has(ch)) {
        return(take_operator(d,ch,TYPE_DICT.colon))
    } else if(cfg.commas.has(ch)) {
        return(take_operator(d,ch,TYPE_DICT.comma))
    } else if(cfg.array_blks.lhas(ch)) {
        return(take_operator(d,ch,TYPE_DICT.alblk))
    } else if(cfg.array_blks.rhas(ch)) {
        return(take_operator(d,ch,TYPE_DICT.arblk))
    } else if(cfg.obj_blks.lhas(ch)) {
        return(take_operator(d,ch,TYPE_DICT.olblk))
    } else if(cfg.obj_blks.rhas(ch)) {
        return(take_operator(d,ch,TYPE_DICT.orblk))
    } else {
        open_word(d,cursor);
    }
}


module.exports = handle;
