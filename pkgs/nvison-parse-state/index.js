const STATE_DICT = {
    "bk": {
        "_self": 0,
        "eof": {
            "_self": 1,
            "lc": 2,
            "blkc": 3,
            "hash": {
                "_self": 4,
                "naked": 5,
                "quote": 6
            },
            "ref": {
                "_self": 7,
                "naked": 8,
                "quote": 9
            }
        }
    },
    "k": {
        "_self": 10,
        "eof": {
            "_self": 11,
            "lc": 12,
            "blkc": 13,
            "hash": {
                "_self": 14,
                "naked": 15,
                "quote": 16
            },
            "ref": {
                "_self": 17,
                "naked": 18,
                "quote": 19
            }
        }
    },
    "ak": {
        "_self": 20,
        "eof": {
            "_self": 21,
            "lc": 22,
            "blkc": 23,
            "hash": {
                "_self": 24,
                "naked": 25,
                "quote": 26
            },
            "ref": {
                "_self": 27,
                "naked": 28,
                "quote": 29
            }
        }
    },
    "bv": {
        "_self": 30,
        "eof": {
            "_self": 31,
            "lc": 32,
            "blkc": 33,
            "hash": {
                "_self": 34,
                "naked": 35,
                "quote": 36
            },
            "ref": {
                "_self": 37,
                "naked": 38,
                "quote": 39
            }
        }
    },
    "v": {
        "_self": 40,
        "eof": {
            "_self": 41,
            "lc": 42,
            "blkc": 43,
            "hash": {
                "_self": 44,
                "naked": 45,
                "quote": 46
            },
            "ref": {
                "_self": 47,
                "naked": 48,
                "quote": 49
            }
        }
    },
    "av": {
        "_self": 50,
        "eof": {
            "_self": 51,
            "lc": 52,
            "blkc": 53,
            "hash": {
                "_self": 54,
                "naked": 55,
                "quote": 56
            },
            "ref": {
                "_self": 57,
                "naked": 58,
                "quote": 59
            }
        }
    }
}

function gtv(d) {if(d instanceof Object){return(d._self)} else {return(d)}}

function get_main_eofv_with_code(code)     {return(code+1)}
function get_lcmt_eofv_with_code(code)     {return(code+2)}
function get_blkcmt_eofv_with_code(code)   {return(code+3)}
function get_hash_quote_eofv_with_code(code) {return(code+6)}
function get_hash_naked_eofv_with_code(code) {return(code+5)}
function get_ref_quote_eofv_with_code(code) {return(code+9)}
function get_ref_naked_eofv_with_code(code) {return(code+8)}

function is_eofv(code) {return(code%10 !==0)}


const LEFTED_TYPE = {
    backslash:0,
    lcmt:1,
    blkcmt:2,
    quote:3,
    naked:4
}

const AVND_CACHE_STATE_DICT = {
    handling:0,
    handled:1
}

function is_should_yield(d,prev,curr) {
    let STATE = STATE_DICT;
    let cond = (
        d.$has_yield_sign() ||
        is_eofv(curr) ||
        (prev === gtv(STATE.av) && curr === gtv(STATE.bv)) ||
        (prev === gtv(STATE.av) && curr === gtv(STATE.bk)) ||
        (prev === gtv(STATE.av) && curr === gtv(STATE.k)) ||
        (prev === gtv(STATE.av) && curr === gtv(STATE.v)) ||
        (prev === gtv(STATE.av) && curr === gtv(STATE.ak)) ||
        (prev === gtv(STATE.v) && curr === gtv(STATE.bv)) ||
        (prev === gtv(STATE.v) && curr === gtv(STATE.bk))
    )
    return(cond)
}


module.exports = {
    STATE_DICT,
    gtv,
    get_main_eofv_with_code,
    get_lcmt_eofv_with_code,
    get_blkcmt_eofv_with_code,
    get_hash_quote_eofv_with_code,
    get_hash_naked_eofv_with_code,
    get_ref_quote_eofv_with_code,
    get_ref_naked_eofv_with_code,
    LEFTED_TYPE,
    AVND_CACHE_STATE_DICT,
    is_eofv,
    is_should_yield
}
