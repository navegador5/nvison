const {empty} = require("nv-facutil-basic");


const {
    UndefinedLiteral,
    NullLiteral,
    BooleanLiteral,
    NumericLiteral,
    StringLiteral,
    ArrayExpression,
    ObjectExpression,
    _Ref,
} = require("nvison-obj-class")



function find_ref_nd_with_hash(pnd,hash) {
    //从父节点开始查找
    let founded = empty;
    let prev = pnd
    while(prev !== null) {
        if(prev.key === hash) {
            founded = prev;
            break;
        } else if(prev.hashes.has(hash)) {
            founded = prev;
            break;
        } else if(prev.$sibseq().toString() === hash) {
            founded = prev;
            break;
        } else {

        }
        prev = prev.$sdfs_prev()
    }
    if(founded !== null) {
        return(founded)
    } else {
        return(empty)
    }
}


function clone(nd,key) {
    if(nd instanceof UndefinedLiteral) {
        return(new UndefinedLiteral('undefined',key))
    } else if(nd instanceof NullLiteral)  {
        return(new NullLiteral('null',key))
    } else if(nd instanceof BooleanLiteral) {
        return(new BooleanLiteral(nd.value.vto_str(),key))
    } else if(nd instanceof NumericLiteral) {
        return(new NumericLiteral(nd.value.vto_str(),key))
    } else if(nd instanceof StringLiteral) {
        return(new StringLiteral(nd.value,key))
    } else if(
        nd instanceof CommentLine ||
        nd instanceof CommentBlock
    ) {
        return(new StringLiteral(nd.value,key))
    } else if(nd instanceof ArrayExpression) {
        return(nd)
    } else if(nd instanceof ObjectExpression) {
        return(nd)
    } else if(nd instanceof _Ref) {
        nd = _Ref.value;
        return(clone(nd,key))
    } {
        return(empty)
    }
}


module.exports = {
    find_ref_nd_with_hash,
    clone
}

