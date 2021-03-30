const char_ws = require("nv-char-whitespace");
const cfg = require("nvison-cfg");
const {
    STATE_DICT,
    TYPE_DICT,
    take_word,
    open_quote,
} = require("./cmmn");



function handle(d,cursor,ch) {
    if(char_ws.is_ws(ch)) {
        return(take_word(d,cursor,STATE_DICT.init))
    } else if(ch === cfg.slash) {
        ///
        return(take_word(d,cursor,STATE_DICT.slash))
    } else if(cfg.quotes.has(ch)) {
        d.cache.ei = cursor.curr;
        open_quote(d,cursor,ch);
        d.pstate = STATE_DICT.word;
    } else if(ch === cfg.hash) {
        return(take_word(d,cursor,STATE_DICT.hash))
    } else if(ch === cfg.ref) {
        return(take_word(d,cursor,STATE_DICT.ref))
    } else if(cfg.colons.has(ch)) {
        take_word(d,cursor,STATE_DICT.init);
        d.cache.push_str(ch,TYPE_DICT.colon);
        return(take_word(d,cursor,STATE_DICT.init))
    } else if(cfg.commas.has(ch)) {
        take_word(d,cursor,STATE_DICT.init);
        d.cache.push_str(ch,TYPE_DICT.comma);
        return(take_word(d,cursor,STATE_DICT.init))    
    } else if(cfg.array_blks.lhas(ch)) {
        take_word(d,cursor,STATE_DICT.init)
        d.cache.push_str(ch,TYPE_DICT.alblk);
        return(take_word(d,cursor,STATE_DICT.init))
    } else if(cfg.array_blks.rhas(ch)) {
        take_word(d,cursor,STATE_DICT.init)
        d.cache.push_str(ch,TYPE_DICT.arblk);
        return(take_word(d,cursor,STATE_DICT.init))    
    } else if(cfg.obj_blks.lhas(ch)) {
        take_word(d,cursor,STATE_DICT.init)
        d.cache.push_str(ch,TYPE_DICT.olblk);
        return(take_word(d,cursor,STATE_DICT.init))    
    } else if(cfg.obj_blks.rhas(ch)) {
        take_word(d,cursor,STATE_DICT.init)
        d.cache.push_str(ch,TYPE_DICT.orblk);
        return(take_word(d,cursor,STATE_DICT.init))    
    } else {

    }
}


module.exports = handle;
