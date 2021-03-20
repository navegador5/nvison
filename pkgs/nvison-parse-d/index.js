const {empty,SimpleStack} = require("nv-facutil-basic");
const Stack = SimpleStack;

const {sync_gen_from_str} = require("nv-string-stream");
const {syncg_unshift} = require("nv-facutil-generator");
const char_esc = require("nv-char-escape").cmmn;
const char_ws = require("nv-char-whitespace");

const cmt = require("nv-string-comment");

const {parse0} = require("nv-string-basic");


const {
    UndefinedLiteral,
    NullLiteral,
    BooleanLiteral,
    NumericLiteral,
    StringLiteral,
    CommentLine,
    CommentBlock,
    ArrayExpression,
    ObjectExpression,
} = require("nvison-obj-class");



const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;
const LEFTED_TYPE = _STATE.LEFTED_TYPE;
const AVND_CACHE_STATE_DICT = _STATE.AVND_CACHE_STATE_DICT;

const typdef = require("nvison-obj-typedef");
const cfg = require("nvison-cfg");
const scope = require("nvison-parse-scope");


function _handle_quote_eof(that,quoted,quote) {
    that.lefted.type = LEFTED_TYPE.quote;
    that.lefted.data  = {
        rslt:quoted.rslt,
        lefted:quoted.ch,
        state:quoted.state,
        quote:quote,
    }
    that.state = _STATE.get_main_eofv_with_code(that.state);
}

function _handle_cmt_eof(that,cmtd,lefted_typ) {
    that.lefted.type = lefted_typ;
    that.lefted.data  = {
        rslt:cmtd.rslt,
        lefted:cmtd.ch,
        state:cmtd.state,
    }
}


function _handle_lcmt_eof(that,cmtd,lefted_typ) {
    _handle_cmt_eof(that,cmtd,lefted_typ);
    that.state = _STATE.get_lcmt_eofv_with_code(that.state)
    return(that)
}

function _handle_blkcmt_eof(that,cmtd,lefted_typ) {
    _handle_cmt_eof(that,cmtd,lefted_typ);
    that.state = _STATE.get_blkcmt_eofv_with_code(that.state)
    return(that)
}



function _handle_cmt(that,Cls,from_gen,lefted_typ) {
    let cmtd = from_gen(that.g);
    if(cmtd.state !== cmt.STATE_DICT.succ) {
        let mn = (Cls === CommentLine)?_handle_lcmt_eof:_handle_blkcmt_eof
        mn(that,cmtd,lefted_typ);
        return(empty)
    } else {
        let cmtnd = new Cls(cmtd.rslt);
        return(cmtnd)
    }
}


function  _handle_lblk(that,Cls) {
    let nd = new Cls(that.str_cache.k);
    that.$set_avnd_cache(nd);
    that.$mv_key_to_nd(nd);
    that.$mv_kcmt_to_kcmt();
    that.$mv_bvcmt_to_bvcmt();
    nd.open = that.ch_cache.curr;
    let pnd = that.stack.lst;
    pnd.append_child(nd);
    that.stack.push(nd);
    if(Cls === ArrayExpression) {that.state = STATE.bv} else {that.state = STATE.bk}
    return(that);
}


const ROOT_LBLK_CH = Symbol("root_lblk_ch")
const ROOT_RBLK_CH = Symbol("root_rblk_ch")

class D {
    #state = gtv(STATE.bv);
    #stack = new Stack();
    constructor(g,pre_padding=empty) {
        if(pre_padding !== empty) {
            let pg = sync_gen_from_str(pre_padding);
            g = syncg_unshift(g,pg);
        }
        this.g = g;
        this.lefted = {type:empty,data:empty};
        this.ch_cache = {tmp:empty,curr:empty};  
        this.str_cache = {k:empty,v:empty};
        this.cmt_cache = {kcmt:[],bvcmt:[],avcmt:[]}
        let rtnd = new ArrayExpression();
        this.stack.push(rtnd);
        rtnd.open = ROOT_LBLK_CH;
        this.avnd_cache = {state:AVND_CACHE_STATE_DICT.handling,data:rtnd}
    }
    get state() {return(this.#state)}
    set state(stt) {this.#state = gtv(stt)}
    get stack() {return(this.#stack)}
    //
    $next_ch() {
        this.ch_cache.curr = this.g.next().value;
        return(this.ch_cache.curr)
    }
    //
    $is_currch_eof() { return(this.ch_cache.curr === undefined)}
    $handle_main_eof() {
        this.state = _STATE.get_main_eofv_with_code(this.state)
        return(this)
    }
    //
    $is_currch_comma() {return(cfg.commas.has(this.ch_cache.curr))}
    //
    $is_currch_colon() {return(cfg.colons.has(this.ch_cache.curr))}
    //
    $is_currch_ws() {return(char_ws.is_ws(this.ch_cache.curr))}
    //
    $is_currch_quote() {return(cfg.quotes.has(this.ch_cache.curr))}
    //
    $is_currch_slash() { return(this.ch_cache.curr === cfg.slash)}
    $is_currch_asterisk() {return(this.ch_cache.curr === cfg.asterisk)}
    //
    $is_currch_ary_lblk() {return(cfg.array_blks.lhas(this.ch_cache.curr))}
    $is_currch_obj_lblk() {return(cfg.obj_blks.lhas(this.ch_cache.curr))}
    $is_currch_lblk() {return(this.$is_currch_ary_lblk() || this.$is_currch_obj_lblk())}
    //
    $is_currch_ary_rblk() {return(cfg.array_blks.rhas(this.ch_cache.curr))}
    $is_currch_obj_rblk() {return(cfg.obj_blks.rhas(this.ch_cache.curr))}
    $is_currch_rblk() {return(this.$is_currch_ary_rblk() || this.$is_currch_obj_rblk())}
    //
    $is_currch_hash() {return(cfg.hash === this.ch_cache.curr)}
    //
    $is_currch_ref() {return(cfg.ref === this.ch_cache.curr)}
    //
    $clear_avnd_cache() {
        this.avnd_cache.data = empty;
        this.avnd_cache.state = empty;
    }
    //
    $mv_avcmt_to_avcmt() {
        let nd = this.avnd_cache.data;
        nd.avcmt = this.cmt_cache.avcmt;
        this.cmt_cache.avcmt = [];
    }
    //
    $change_state_when_end_av() {
        let pnd = this.stack.lst;
        if(pnd.is_ary()) {
            this.state = STATE.bv
        } else {
            this.state = STATE.bk
        }
        return(this.state)
    }
    //
    $vcache_to_nd() {
        let v = this.str_cache.v;
        let rslt = parse0(
            v,
            {only_value:false,with_value:true,with_type:true,unknown_as_string:true}
        );
        let nd ;
        if(rslt.type === typdef.TYPE_DICT.UndefinedLiteral) {
            nd = new UndefinedLiteral(this.k);
        } else if(rslt.type === typdef.TYPE_DICT.NullLiteral) {
            nd = new NullLiteral(this.k);
        } else if(rslt.type === typdef.TYPE_DICT.BooleanLiteral.TrueLiteral) {
            nd = new BooleanLiteral("true",this.k);
        } else if(rslt.type === typdef.TYPE_DICT.BooleanLiteral.FalseLiteral) {
            nd = new BooleanLiteral("false",this.k);
        } else if(rslt.type === typdef.TYPE_DICT.StringLiteral) {
            nd = new StringLiteral(rslt.value,this.k);
        } else {
            nd = new NumericLiteral(rslt,this.k);
        }
        this.str_cache.v = empty;
        return(nd)
    }
    //
    $mv_kcmt_to_kcmt() {
        let nd = this.avnd_cache.data;
        nd.kcmt = this.cmt_cache.kcmt;
        this.cmt_cache.kcmt = [];
    }
    //
    $mv_bvcmt_to_bvcmt() {
        let nd = this.avnd_cache.data;
        nd.bvcmt = this.cmt_cache.bvcmt;
        this.cmt_cache.bvcmt = [];
    }
    //
    $mv_key_to_nd() {
        let nd = this.avnd_cache.data;
        nd.key = this.str_cache.k;
        this.str_cache.k = empty;
        return(nd.key);
    }
    //
    $set_avnd_cache(nd,state=AVND_CACHE_STATE_DICT.handling) {
        this.avnd_cache.data = nd;
        this.avnd_cache.state = state
        return(this.avnd_cache)
    }
    //
    $setup_leafnd() {
        let nd = this.$vcache_to_nd();
        this.$set_avnd_cache(nd,AVND_CACHE_STATE_DICT.handling);
        this.$mv_key_to_nd();
        this.$mv_kcmt_to_kcmt();
        this.$mv_bvcmt_to_bvcmt();
        this.$mv_avcmt_to_avcmt();
        let pnd = this.stack.lst;
        pnd.append_child(nd);
    }
    //
    $change_state_when_end_av_with_str() {
        let pnd = this.stack.lst;
        if(pnd.is_ary()) {
            this.state = STATE.v
        } else {
            this.state = STATE.k
        }
        return(this.state)
    }
    //
    $end_av_with_str(s=empty,should_skip=false) {
        s = (s===empty)?this.ch_cache.curr:s;
        this.$mv_avcmt_to_avcmt();
        this.$clear_avnd_cache();
        let pnd = this.stack.lst;
        if(pnd.is_ary()) {
            this.state = STATE.v
            this.str_cache.v = s; 
        } else {
            if(should_skip) { 
                this.state = STATE.bk;
            } else {
                this.state = STATE.k;
                this.str_cache.k = s;
            }
        }        
    }
    //
    $handle_quote() {
        let quoted = char_esc.from_generator(this.g,this.ch_cache.curr);
        if(quoted.state !== char_esc.STATE_DICT.succ) {
            _handle_quote_eof(quoted,this.ch_cache.curr);
            return(empty)
        } else {
            return(quoted.rslt)
        }
    }
    //
    $abandon_key(s=empty) {
        if(s === empty) {
            this.str_cache.k = d.ch_cache.curr;
        } else {
            this.str_cache.k = s;
        }
        this.cmt_cache.kcmt = [];
        this.state = STATE.k
    }
    //
    $handle_lcmt() {
        return(_handle_cmt(this,CommentLine,cmt.lc_from_generator,LEFTED_TYPE.lcmt))
    }
    $handle_blkcmt() {
        return(_handle_cmt(this,CommentBlock,cmt.blk_from_generator,LEFTED_TYPE.blkcmt))
    }
    //
    $push_kcmt(cmtnd) {
        cmtnd.type = (cmt instanceof CommentLine)?
            typdef.TYPE_DICT.CommentLine.k:
            typdef.TYPE_DICT.CommentBlock.k
        this.cmt_cache.kcmt.push(cmtnd);
    }
    //
    $push_bvcmt(cmtnd) {
        let cn = (cmtnd instanceof CommentLine)?'CommentLine':'CommentBlock';
        cmtnd.type = typdef.TYPE_DICT[cn].bv; 
        this.cmt_cache.bvcmt.push(cmtnd);
    }
    //
    $push_avcmt(cmtnd) {
        cmtnd.type = (cmt instanceof CommentLine)?
            typdef.TYPE_DICT.CommentLine.k:
            typdef.TYPE_DICT.CommentBlock.k
        this.cmt_cache.avcmt.push(cmtnd);        
    }
    //
    $mv_avcmt_to_ttcmt(pnd) {
        pnd = pnd??this.avnd_cache.data.$parent();
        for(let cmtnd of this.cmt_cache.avcmt) {pnd.$append_child(cmtnd)};
        this.cmt_cache.avcmt = [];
    }
    //
    $unshift_g(lefted) {
        lefted = lefted??this.ch_cache.curr;
        let pg = sync_gen_from_str(lefted);
        this.g = syncg_unshift(this.g,pg);
    }
    //
    $open_nonleaf_nd() {
        if(cfg.array_blks.lhas(this.ch_cache.curr)) {
            return(_handle_lblk(this,ArrayExpression))
        } else if(cfg.obj_blks.lhas(this.ch_cache.curr)) {
            return(_handle_lblk(this,ObjectExpression))
        } else {
            //impossible
        }
    }
    //
    $is_rblk_match() {
        let pnd = this.stack.lst;
        let getl = (pnd.is_ary()) ?'array_blks' : 'obj_blks';
        return(cfg[getl].getl(this.ch_cache.curr) === pnd.open)
    }
    //
    $close_nonleaf_nd() {
        let pnd = this.stack.lst;
        pnd.close = this.ch_cache.curr;
        this.$set_avnd_cache(pnd);
        this.stack.pop();
        this.state = STATE.av;
    }
    $get_hash_or_ref(mode='#') {
        let hrs = empty;
        let ch = this.$next_ch();
        let cache = ""
        while(!char_ws.is_ws(ch) && !cfg.commas.has(ch)) {
            if(cfg.quotes.has(ch)) {
                let quoted = char_esc.from_generator(this.g,this.ch_cache.curr);
                if(quoted.state !== char_esc.STATE_DICT.succ) {
                    _handle_quote_eof(quoted,this.ch_cache.curr);
                    if(mode === cfg.hash) {
                        this.state = _STATE.get_hash_quote_eofv_with_code(this.state);
                    } else {
                        this.state = _STATE.get_ref_quote_eofv_with_code(this.state);
                    }
                    return(hrs)
                } else {
                    cache = cache + quoted.rslt;
                }
                ch = this.$next_ch();
            } else if(ch === undefined) {
                $handle_main_eof();
                return(hrs);
            } else {
                cache = cache + ch;
                ch = this.$next_ch();
                //collecting
            }
        }
        hrs = cache;
        return(hrs)
    }
    //
    $is_hash_of_pnd() {
        let pnd = this.stack.lst;
        return(pnd.$children().length === 0);         
    }
    //
    $find_ref(ref_str) {
        let pnd = this.stack.lst;
        let nd = pnd.$lstch();
        let refnd = scope.find_refnd_with_hash(nd,ref_str);
        return(refnd)
    }
    $add_ref_to_parent(refnd) {
        let pnd = this.stack.lst;
        let nd = scope.clone(refnd,this.str_cache.k);
        this.$set_avnd_cache(nd);
        this.$mv_key_to_nd(nd); 
        this.$mv_kcmt_to_kcmt();
        this.$mv_bvcmt_to_bvcmt();
        pnd.append_child(nd);
    }
}

D[ROOT_LBLK_CH] = ROOT_LBLK_CH;
D[ROOT_RBLK_CH] = ROOT_RBLK_CH;


module.exports = D 
