const TYPE_DICT = {
    "UndefinedLiteral": 0,
    "NullLiteral": 1,
    "BooleanLiteral": {
        "_self": 2,
        "FalseLiteral": 3,
        "TrueLiteral": 4
    },
    "NumericLiteral": {
        "_self": 5,
        "Integer": 6,
        "Float": 7,
        "BigInt": 8,
        "PosInfinity": 9,
        "NegInfinity": 10,
        "NaN": 11
    },
    "StringLiteral": 12,
    "ArrayExpression": {
        "_self": 13,
        "element": 14
    },
    "ObjectExpression": {
        "_self": 15,
        "property": 16
    },
    "_Ref": 17,
    "CommentLine": {
        "_self": 18,
        "tt": 19,
        "k": 20,
        "bv": 21,
        "av": 22
    },
    "CommentBlock": {
        "_self": 23,
        "tt": 24,
        "k": 25,
        "bv": 26,
        "av": 27
    }
}


module.exports = {
    TYPE_DICT,
}
