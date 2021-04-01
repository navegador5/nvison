const char_ws = require("nv-char-whitespace");
const cfg = require("nvison-cfg");

const {
    STATE_DICT
} = require("./state");

const {
    comma,
    colon,
    Alblk,
    Arblk,
    Olblk,
    Orblk,
} = require("./cls");

const {
    is_naked_no_need_parse
} = require("./cmmn");


function handle(d,ch) {
    if(char_ws.is_ws(ch)) {
        if(
            (d.cache.length >0) &&
            (d.is_cache_ref() || d.is_cache_hash())
        ) {
            d.cache.clear()
        }
    } else if(ch === cfg.slash) {
        d.state = STATE_DICT.slash;
    } else if(cfg.quotes.has(ch)) {
        d.state = STATE_DICT.qopen;
    } else if(ch === cfg.hash) {
        d.cache.push_str(ch)
    } else if(ch === cfg.ref) {
        d.cache.push_str(ch)     
    } else if(cfg.colons.has(ch)) {
        if(!d.is_lst_colon()) {d.toks.push(colon)}
    } else if(cfg.commas.has(ch)) {
        if(!d.is_lst_comma()) {d.toks.push(comma)}
    } else if(cfg.array_blks.lhas(ch)) {
        d.toks.push(new Alblk(ch))
    } else if(cfg.array_blks.rhas(ch)) {
        d.toks.push(new Arblk(ch))
    } else if(cfg.obj_blks.lhas(ch)) {
        d.toks.push(new Olblk(ch))
    } else if(cfg.obj_blks.rhas(ch)) {
        d.toks.push(new Orblk(ch))
    } else {
        d.cache.push_pos(d.chunk.curr_pos);
        d.state = STATE_DICT.wopen;
        if(is_naked_no_need_parse(ch)) {
            d.need_parse = false;
        } else {
        }
    }
}


module.exports = handle
