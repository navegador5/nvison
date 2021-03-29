const {WS_CH_ARR,NON_NL_WS_CH_ARR,NL_CH_ARR} = require("nv-char-whitespace");
const {slength} = require("nv-string-basic"); 
const {add_repr,ZWNJ,ZWJ} = require("nv-facutil-basic");


const ERROR_DICT = {
    tmpl_quote:new Error('tmpl_quote: ` cant be deleted'),
    reserved:new Error(" [/,*,#,&,`,\\,] and whitespaces  are reserved"),
    inuse:new Error("in using"),
    char:new Error("must be a char"),
    pair:new Error("left block must be different with right"),
    cant_be_empty:new Error("can NOT be empty")
}


const  SYM_GET_PAIR_LMP = Symbol("get_pair_lmp")
const  SYM_ADD_PAIR_RESERVED = Symbol("add_pair_reserved")


class Pair {
    #ctrl
    #lmp = new Map()
    #rmp = new Map()
    constructor(ctrl) {this.#ctrl = ctrl}
    get [SYM_GET_PAIR_LMP]() {return(this.#lmp)}
    get size() {return(this.#lmp.size)}
    [SYM_ADD_PAIR_RESERVED](left,right) {
        if(left === right) {throw(ERROR_DICT.pair)}
        this.#lmp.set(left,right);
        this.#rmp.set(right,left);
    }
    add(left,right) {
        this.#ctrl.validate(left);
        this.#ctrl.validate(right);
        if(left === right) {throw(ERROR_DICT.pair)}
        this.#lmp.set(left,right);
        this.#rmp.set(right,left);
    }
    ldelete(l) {
        if(this.size <2) {
            throw(ERROR_DICT.cant_be_empty)
        } else {
            let r = this.#lmp.get(l)
            this.#lmp.delete(l)
            this.#rmp.delete(r)
        }
    }
    rdelete(r) {
        if(this.size <2) {
            throw(ERROR_DICT.cant_be_empty)
        } else {
            let l = this.#rmp.get(r)
            this.#rmp.delete(r)
            this.#lmp.delete(l)
        }
    }
    lhas(v) {return(this.#lmp.has(v))}
    rhas(v) {return(this.#rmp.has(v))}
    has(v) {return(this.lhas(v) || this.rhas(v))}
    getl(r) {return(this.#rmp.get(r))}
    getr(l) {return(this.#lmp.get(l))}
    [Symbol.iterator]() {return(this.#lmp[Symbol.iterator]())}
}

function _pair_repr(that) {return(new Map(that[SYM_GET_PAIR_LMP]))}

add_repr(Pair,_pair_repr);

const  SYM_GET_SINGLE_ST = Symbol("get_single_set")
const  SYM_ADD_SINGLE_RESERVED = Symbol("add_single_reserved")

class Single {
    #ctrl
    #st = new Set()
    constructor(ctrl) {
        this.#ctrl = ctrl
    }
    get [SYM_GET_SINGLE_ST]() {return(this.#st)}
    [SYM_ADD_SINGLE_RESERVED](v) {this.#st.add(v)}
    add(v) {
        this.#ctrl.validate(v);
        this.#st.add(v)
    }
    delete(v) {
        if(this.size <2) {
            throw(ERROR_DICT.cant_be_empty)
        } else {
            if(v === '`') {
                throw(ERROR_DICT.tmpl_quote)
            } else {
                this.#st.delete(v)
            }
        }
    }
    has(v) {
        return(this.#st.has(v))
    }
    [Symbol.iterator]() {return(this.#st[Symbol.iterator]())}
}

function _single_repr(that) {return(new Set(that[SYM_GET_SINGLE_ST]))}

add_repr(Single,_single_repr);

class Cfg {
    #ablks 
    #oblks
    #quotes
    #commas
    #colons
    #inited = false
    constructor() {
        this.#ablks = new Pair(this);
        this.#ablks.add('[',']');
        this.#ablks.add('(',')');
        this.#ablks.add('<','>');
        this.#oblks = new Pair(this);
        this.#oblks.add('{','}');
        this.#quotes = new Single(this);
        this.#quotes.add('"');
        this.#quotes.add("'");
        this.#quotes[SYM_ADD_SINGLE_RESERVED]('`') 
        this.#commas = new Single(this);
        this.#commas.add(',');
        this.#commas.add(';');
        this.#colons = new Single(this);
        this.#colons.add(':');
        this.#colons.add('=');
        this.#inited = true
    }
    ////
    get reserved () {return(['/','*','#','&','`','\\'].concat(WS_CH_ARR))}
    get inuse() {
        let st = new Set()
        if(this.#inited) {
            for(let each of this.#quotes) {st.add(each)}
            for(let each of this.#commas) {st.add(each)}
            for(let each of this.#colons) {st.add(each)}
            for(let each of this.#ablks[SYM_GET_PAIR_LMP]) {st.add(each)}
            for(let each of this.#oblks[SYM_GET_PAIR_LMP]) {st.add(each)}
        }
        return(st)
    }
    validate(ch) {
        if( typeof(ch)!=='string' || slength(ch)!==1) {throw(ERROR_DICT.char)}
        let reserved = this.reserved;
        if(reserved.includes(ch)) {throw(ERROR_DICT.reserved)}
        let inuse = Array.from(this.inuse).flat();
        if(inuse.includes(ch)) {throw(ERROR_DICT.inuse)}
        return(ch)
    }
    ////
    get esc()   {return('\\')}
    get slash() {return('/')}
    get line_comment() {return('//')}
    get asterisk() {return('*')}
    get blk_comments() {return(['/*','*/'])}
    get hash () {return('#')}
    get ref  () {return('&')}
    get tmpl_quote() {return('`')}
    ////
    get nl() {return(NL_CH_ARR)}
    get non_nl_ws() {return(NON_NL_WS_CH_ARR)}
    get ws() {return(WS_CH_ARR)}
    //// fst_xxx is for padding when scan
    get array_blks() {return(this.#ablks)}
    get fst_ary_blks() {return(Array.from(this.#ablks)[0])}
    get obj_blks() {return(this.#oblks)}
    get fst_obj_blks() {return(Array.from(this.#oblks)[0])}
    get quotes() {return(this.#quotes)}
    get fst_quote() {return(Array.from(this.#quotes)[0])}
    get commas() {return(this.#commas)}
    get fst_comma() {return(Array.from(this.#commas)[0])}
    get colons() {return(this.#colons)}
    get fst_colon() {return(Array.from(this.#colons)[0])}
}

class _Reserved {
    constructor(cfg) {
        this.reserved = cfg.reserved;
    }
    get [Symbol.toStringTag] () {return('reserved')}
}

Object.defineProperty(_Reserved,'name',{value:ZWJ})


class _Fixed {
    constructor(cfg) {
        this.esc = cfg.esc;
        this.hash = cfg.hash;
        this.ref = cfg.ref;
        this.tmpl_quote = cfg.tmpl_quote;
        this.slash = cfg.slash;
        this.asterisk = cfg.asterisk;
        this.line_comment = cfg.line_comment;
        this.blk_comments = cfg.blk_comments;
        this.nl = cfg.nl;
        this.non_nl_ws = cfg.non_nl_ws;
    }
    get [Symbol.toStringTag] () {return('fixed')}
}

Object.defineProperty(_Fixed,'name',{value:ZWJ})

class _Configurable {
    constructor(cfg) {
        this.obj_blks = cfg.obj_blks,
        this.array_blks = cfg.array_blks,
        this.quotes = cfg.quotes,
        this.commas = cfg.commas,
        this.colons = cfg.colons
    }
    get [Symbol.toStringTag] () {return('configurable-if-not-reserved')}
}

Object.defineProperty(_Configurable,'name',{value:ZWNJ})


function _cfg_repr(that) {
    return([
        new _Fixed(that),
        new _Configurable(that),
        new _Reserved(that)
    ])
}

add_repr(Cfg,_cfg_repr);

const cfg = new Cfg()
cfg.ERROR_DICT = ERROR_DICT

module.exports = cfg; 
