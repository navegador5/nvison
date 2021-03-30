const char_ws = require("nv-char-whitespace");
const cfg = require("nvison-cfg");
const {
    STATE_DICT,
    TYPE_DICT,
} = require("./cmmn");



function take_tok(d,cursor,state) {
    d.state = state;
    d.cache.ei = cursor.curr;
    d.toks.push(cache.tok());
    return(d);
}

function handle(d,cursor,ch) {
    if(char_ws.is_ws(ch)) {
        d.state = STATE_DICT.init;
    } else if(ch === cfg.slash) {
        d.state = STATE_DICT.lcmt;
    } else if(ch === cfga.sterisk) {
        d.state = STATE_DICT.blkcmt;
    } else if(cfg.quotes.has(ch)) {
        d.cache.ei = cursor.curr;
        d.quote = ch;
        d.state = STATE_DICT.quote;
    } else if(ch === cfg.hash) {
        return(take_tok(d,cursor,STATE_DICT.hash))
    } else if(ch === cfg.ref) {
        return(take_tok(d,cursor,STATE_DICT.ref))
    } else if(cfg.colons.has(ch)) {
        take_tok(d,cursor,STATE_DICT.init);
        d.cache.push_str(ch,TYPE_DICT.colon);
        return(take_tok(d,cursor,STATE_DICT.init))
    } else if(cfg.commas.has(ch)) {
        take_tok(d,cursor,STATE_DICT.init);
        d.cache.push_str(ch,TYPE_DICT.comma);
        return(take_tok(d,cursor,STATE_DICT.init))    
    } else if(cfg.array_blks.lhas(ch)) {
        take_tok(d,cursor,STATE_DICT.init)
        d.cache.push_str(ch,TYPE_DICT.alblk);
        return(take_tok(d,cursor,STATE_DICT.init))
    } else if(cfg.array_blks.rhas(ch)) {
        take_tok(d,cursor,STATE_DICT.init)
        d.cache.push_str(ch,TYPE_DICT.arblk);
        return(take_tok(d,cursor,STATE_DICT.init))    
    } else if(cfg.obj_blks.lhas(ch)) {
        take_tok(d,cursor,STATE_DICT.init)
        d.cache.push_str(ch,TYPE_DICT.olblk);
        return(take_tok(d,cursor,STATE_DICT.init))    
    } else if(cfg.obj_blks.rhas(ch)) {
        take_tok(d,cursor,STATE_DICT.init)
        d.cache.push_str(ch,TYPE_DICT.orblk);
        return(take_tok(d,cursor,STATE_DICT.init))    
    } else {
    }
}


module.exports = handle;
