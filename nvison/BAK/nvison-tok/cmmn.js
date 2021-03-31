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
