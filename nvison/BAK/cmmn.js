const STATE_DICT = {
    init:0,
    word:1,
    slash:1,
    quote:2,
    hash:3,
    ref:4,
    lcmt:5,
    blkcmt:6,
    asterisk:7,
    esc:8
}

const TYPE_DICT = {
    qoute:0,
    lcmt:1,
    blkcmt:2,
    hash:3,
    ref:4,
    comma:5,
    colon:6,
    alblk:7,
    arblk:8,
    olblk:9,
    orblk:10
}

function open_word(d,cursor) {
    d.state = STATE_DICT.word;
    d.cache.push_pos(cursor.prev);
}

function take_operator(d,ch,typ) {
    d.cache.push_str(ch,typ);
    d.state = STATE_DICT.init;
    d.toks.push(cache.tok());
    return(d)
}


function take_word(d,cursor,state) {
    d.state = state;
    d.cache.ei = cursor.curr;
    d.toks.push(cache.tok());
    return(d);
}

function open_quote(d,cursor,ch) {
    d.cache.push_pos(cursor.curr);
    d.quote = ch;
    d.state = STATE_DICT.quote;
}




module.exports = {
    STATE_DICT,
    TYPE_DICT,
    take_word,
    open_quote,
    take_operator,
}
