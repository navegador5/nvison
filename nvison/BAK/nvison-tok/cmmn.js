function is_need_parse_with_fst(ch) {
    return(
        ch === 'u' ||   //maybe undefined
        ch === 'n' ||   //maybe null
        ch === 't' ||   //maybe true
        ch === 'f' ||   //maybe false
        ch === 'I' ||   //maybe Infinity
        ch === 'N' ||   //maybe NaN
        ch === '+' ||   //maybe Num
        ch === '-' ||      
        ch === '.' || 
        ch === '0' ||   //0b  0o 0x
        ch === '1' || ch === '2' || ch === '3' || ch === '4' || 
        ch === '5' || ch === '6' || ch === '7' || ch === '8' || ch === '9'
    )
}

function is_need_parse_with_lst(ch) {
    return(
        ch === 'd' ||   //maybe undefined
        ch === 'l' ||   //maybe null
        ch === 'e' ||   //maybe true false
        ch === 'y' ||   //maybe Infinity
        ch === 'N' ||   //maybe NaN
        //maybe Number
        ch === '.' ||
        ch === '0' || ch === '1' || ch === '2' || ch === '3' || ch === '4' ||
        ch === '5' || ch === '6' || ch === '7' || ch === '8' || ch === '9' ||
        ch === 'a' || ch === 'b' || ch === 'c' || ch === 'd' || ch === 'e' || ch === 'f' ||
        ch === 'A' || ch === 'B' || ch === 'C' || ch === 'D' || ch === 'E' || ch === 'F'
    )
}

const MAYBE_ARR= [
  '+', '-', '.', '0', '1', '2', '3',
  '4', '5', '6', '7', '8', '9', 'A',
  'B', 'C', 'D', 'E', 'F', 'I', 'N',
  'O', 'X', 'a', 'b', 'c', 'd', 'e',
  'f', 'i', 'l', 'n', 'o', 'r', 's',
  't', 'u', 'x', 'y'
]
 
const MAYBE_SET = new Set(MAYBE_ARR);
MAYBE_ARR = null;

function is_naked_no_need_parse(ch) {return(!MAYBE_SET.has(ch))}

function is_naked_need_parse(d) {
    let fst = d.cache.fst.get_fstch(d.chunk);
    let lst = d.cache.fst.get_lstch(d.chunk);
    return(
        is_need_parse_with_fst(ch) ||
        is_need_parse_with_lst(ch)
    )
}


module.exports = {
    is_naked_need_parse,
    is_naked_no_need_parse
}
