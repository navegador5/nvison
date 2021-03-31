const S0_TYPE_DICT = {
   esc:0
}


const TYPE_DICT = {
    word:0,
    lcmt:1,
    blkcmt:2,
    hash:3,
    ref:4,
    comma:5,
    colon:6,
    alblk:7,
    arblk:8,
    olblk:9,
    orblk:10,
    str:11,
    quoted:12,
    tmpl_quoted:13
}


module.exports = {
    S0_TYPE_DICT,
    TYPE_DICT
}
