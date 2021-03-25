const typdef = require("nvison-obj-typedef");
const {Root} = require("ndtreejs").ndcls;

const {empty} = require("nv-facutil-basic");
const str_bsc  = require("nv-string-basic");




class ObjectProperty extends Root {
    constructor(key=empty) {
        super();
        this.key = key;          //只可能是empty 或者 str
        this.value = empty;
        this.type = empty;
        this.chtype = empty;
        this.hashes = new Set();
        this.kcmt = [];        //after_key
        this.bvcmt = [];       //before_val
        this.avcmt = [];       //after_val
    }
    kto_str() {
        if(this.key === empty) {return(empty)} else {return(JSON.stringify(this.key))}
    }
    is_undefined() {return(this.type === typdef.TYPE_DICT.UndefinedLiteral)}
    is_null() {return(this.type === typdef.TYPE_DICT.NullLiteral)}
    is_boolean() {return(this.type>=2 && this.type<=4)}
    is_false(){return(this.type===3)}
    is_true(){return(this.type===4)}
    is_numerical(){ return(nd.type >=5 && nd.type<=11)}
    is_int() {return(this.type===6)}
    is_float() {return(this.type===7)}
    is_bigint() {return(this.type===8)}
    is_infi() {return(this.type===9 || this.type===10)}
    is_pos_infi() {return(this.type===9)}
    is_neg_infi() {return(this.type===10)}
    is_nan() {return(this.type===11)}
    is_str() {return(this.type===12)}
    is_ary() {return(this.type===13)}
    is_ele() {return(this.chtype===14)}
    is_dict() {return(this.type===15)}
    is_prop() {return(this.chtype===16)}
    is_ref()  {return(this.type===17)}
    is_leaf()  {return(!this.is_ary() && !this.is_dict())}
    is_cmt()  {return(this.is_lcmt() || this.is_blcmt())}
    is_lcmt() {return(this.type>=18 && this.type<=22)}
    is_blcmt() {return(this.type>=23 && this.type<=27)}
    is_ttcmt() {return(this.type===19 || this.type===24)}
    is_kcmt() {return(this.type===20 || this.type===25)}
    is_bvcmt() {return(this.type===21 || this.type===26)}
    is_avcmt() {return(this.type===22 || this.type===27)}
    is_prim() {return(this.is_leaf() && !is_cmt())}
}


class UndefinedLiteral extends ObjectProperty {
    constructor(key=empty) {
        super(key);
        this.value = undefined;
        this.type = typdef.TYPE_DICT.UndefinedLiteral;
    }
    vto_rawstr() {return(str_bsc.to_str(this.value))}
}


class NullLiteral extends ObjectProperty {
    constructor(key=empty) {
        super(key);
        this.value = null;
        this.type = typdef.TYPE_DICT.NullLiteral;
    }
    vto_rawstr() {return(str_bsc.to_str(this.value))}
}


class BooleanLiteral extends ObjectProperty {
    constructor(literal,key=empty) {
        super(key);
        if(literal === "true") { 
            this.value=true;
            this.type = typdef.TYPE_DICT.BooleanLiteral.TrueLiteral;
        }
        if(literal === "false") { 
            this.value=false;
            this.type = typdef.TYPE_DICT.BooleanLiteral.FalseLiteral;
        }
    }
    vto_rawstr() {return(str_bsc.to_str(this.value))}
}


class NumericLiteral extends ObjectProperty {
    constructor(literal,key=empty) {
        super(key);
        if(typeof(literal) === 'string') {
            let tmp = str_bsc.parse_num(literal,true)
            this.value = tmp.value;
            this.type = tmp.type;
        } else {
            this.value = literal.value;
            this.type = literal.type;
        }
    }
    vto_rawstr() {
        let s = str_bsc.to_str(this.value)
        if(this.type===typdef.TYPE_DICT.NumericLiteral.Float && !s.includes(".")) {
            s = s+"."
        }
        return(s)
    }
}

function _to_str_using_unesc(s) {
    s = JSON.stringify(s);
    return(s.substr(1,s.length-2));
}


class StringLiteral extends ObjectProperty {
    constructor(literal,key=empty) {
        super(key);
        this.value = literal;
        this.type = typdef.TYPE_DICT.StringLiteral;
    }
    vto_rawstr() {return(_to_str_using_unesc(this.value))}
}


function _set_cmt_type_to_tt(cmt) {
    if(cmt instanceof CommentLine){
        cmt.type = typdef.TYPE_DICT.CommentLine.tt
    } else {
        cmt.type = typdef.TYPE_DICT.CommentBlock.tt
    }
}


function _new_ttcmt_data(that,cmt) {
    let lsib = that.$lsib();
    return({
        lsib,
        data:cmt
    })
}

function _append_ttcmt(that,cmt) {
    _set_cmt_type_to_tt(cmt);
    let cmtwrap = _new_ttcmt_data(that,cmt);
    that.ttcmt.push(cmtwrap);
    return(cmtwrap);
}


class ArrayExpression extends ObjectProperty {
    constructor(key=empty) {
        super(key);
        this.value = [];
        this.type = typdef.TYPE_DICT.ArrayExpression._self;
        this.open = empty;
        this.close = empty;
        this.ttcmt = [];
    }
    is_inited() {return(this.open===empty && this.close === empty)}
    is_opened() { return(this.open!==empty && this.close === empty)}
    is_closed() {return(this.open!==empty && this.close !== empty)}
    append_child(child) {
        child.chtype = typdef.TYPE_DICT.ArrayExpression.element;
        if(child.is_ref()) {
            this.value.push(child.value.value);
        } else {
            this.value.push(child.value);
        }
        return(this.$append_child(child))
    }
    append_ttcmt(cmt) {return(_append_ttcmt(this,cmt))}
}

class ObjectExpression extends ObjectProperty {
    constructor(key=empty) {
        super(key);
        this.value = {};
        this.type = typdef.TYPE_DICT.ObjectExpression._self;
        this.open = empty;
        this.close = empty;
        this.ttcmt = [];
    }
    is_inited() {return(this.open===empty && this.close === empty)}
    is_opened() { return(this.open!==empty && this.close === empty)}
    is_closed() {return(this.open!==empty && this.close !== empty)}
    append_child(child) {
        child.chtype = typdef.TYPE_DICT.ObjectExpression.property;
        if(child.is_ref()) {
            this.value[child.key] = child.value.value;
        } else {
            this.value[child.key] = child.value;
        }
        return(this.$append_child(child))
    }
    append_ttcmt(cmt) {return(_append_ttcmt(this,cmt))}
}



class _Ref extends ObjectProperty {
    constructor(nd,key=empty) {
        super(key);
        this.value = nd;
        this.type = typdef.TYPE_DICT._Ref;
    }
    vto_rawstr() {
        if(!this.value.is_leaf()) {
            if(this.value.key !== empty) {
                return('&"'+_to_str_using_unesc(this.value.key)+'"')
            } else {
                for(let hash of this.value.hashes) {return('&"'+_to_str_using_unesc(hash)+'"')}
            }
        } else {
            return(this.value.vto_rawstr())
        }
    }
}


class CommentLine extends ObjectProperty {
    constructor(s) {
        super();
        this.value = s;
        this.type = typdef.TYPE_DICT.CommentLine._self;
    }
    vto_rawstr(lf="\n") {return("//"+_to_str_using_unesc(this.value)+lf)}
}


class CommentBlock extends ObjectProperty {
    constructor(s) {
        super();
        this.value = s;
        this.type = typdef.TYPE_DICT.CommentBlock._self;
    }
    vto_rawstr() {return("/*"+_to_str_using_unesc(this.value) +"*/")}
}


module.exports = {
    UndefinedLiteral,
    NullLiteral,
    BooleanLiteral,
    NumericLiteral,
    StringLiteral,
    ArrayExpression,
    ObjectExpression,
    _Ref,
    CommentLine,
    CommentBlock,
}
