const {slength} = require("nv-string-basic"); 
const {add_repr,ZWNJ,ZWJ} = require("nv-facutil-basic");


const ERROR_DICT = {
    reserved:new Error(" [/,*,#,&,`]   are reserved"),
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
            this.#ctrl.validate(l);
            let r = this.#lmp.get(l)
            this.#lmp.delete(l)
            this.#rmp.delete(r)
        }
    }
    rdelete(r) {
        if(this.size <2) {
            throw(ERROR_DICT.cant_be_empty)
        } else {
            this.#ctrl.validate(r);
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
            this.#ctrl.validate(v);
            this.#st.delete(v)
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
        this.#colons = new Single(this);
        this.#colons.add(':');
        this.#colons.add('=');
        this.#inited = true
    }
    ////
    get reserved () {return(['/','*','#','&','`'])}
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
    get line_comment() {return('//')}
    get blk_comments() {return(['/*','*/'])}
    get hash () {return('#')}
    get ref  () {return('&')}
    get tmpl_quote() {return('`')}
    ////
    get array_blks() {return(this.#ablks)}
    get obj_blks() {return(this.#oblks)}
    get quotes() {return(this.#quotes)}
    get commas() {return(this.#commas)}
    get colons() {return(this.#colons)}
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
        this.hash = cfg.hash;
        this.ref = cfg.ref;
        this.tmpl_quote = cfg.tmpl_quote;
        this.line_comment = cfg.line_comment;
        this.blk_comments = cfg.blk_comments;
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
