const char_ws = require("nv-char-whitespace");
const cfg = require("nvison-cfg");

const {
    STATE_DICT
} = require("./state");

const {
    Word,
    Str,
    comma,
    colon,
    Alblk,
    Arblk,
    Olblk,
    Orblk,
} = require("./cls");

const {
    is_naked_need_parse,
    is_naked_no_need_parse
} = require("./cmmn");



function handle(d,ch) {
    if(char_ws.is_ws(ch)) {
       
        if(d.cache.length === 1) {
            if(d.need_parse ===true || is_naked_need_parse(d)) {
                d.toks.push(new Word(d.cache.take_str()));
            } else {
                d.toks.push(new Str(d.cache.take_str()));
            }
        } else {

        }
        d.need_parse = true;
        d.state = STATE_DICT.init

    } else if(ch === cfg.slash) {
    
    } else if(cfg.quotes.has(ch)) {
    
    } else if(ch === cfg.hash) {
    
    } else if(ch === cfg.ref) {
    
    } else if(cfg.colons.has(ch)) {
           
    } else if(cfg.commas.has(ch)) {
    
    } else if(cfg.array_blks.lhas(ch)) {
    
    } else if(cfg.array_blks.rhas(ch)) {
    
    } else if(cfg.obj_blks.lhas(ch)) {
    
    } else if(cfg.obj_blks.rhas(ch)) {
    
    } else {
        if(d.need_parse) {
            if(is_naked_no_need_parse(ch)) {d.need_parse = false}
        } else {
        }
    }
}


module.exports = handle
