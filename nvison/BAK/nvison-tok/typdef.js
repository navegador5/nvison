const S0_TYPE_DICT = {
   esc:0
}


const TYPE_DICT = {
    word:0,         //需要parse
    lcmt:1,         //如果有 esc ,需要parse; 否则直接生成 CommentLine 
    blkcmt:2,       //如果有 esc ,需要parse; 否则直接生成 CommentBlock
    hash:3,         //是一个cache prefix+quoted+suffix;
    ref:4,          //是一个cache prefix+quoted+suffix; 
    comma:5,        
    colon:6,
    alblk:7,
    arblk:8,
    olblk:9,
    orblk:10,
    str:11,         //无需处理直接生成 StringLiteral
    quoted:12,      //如果有 esc ,需要parse
    tmpl_quoted:13  //暂不支持
}


module.exports = {
    S0_TYPE_DICT,
    TYPE_DICT
}
