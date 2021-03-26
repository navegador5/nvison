const ison = require("/opt/JS/NV5_/nvison/nvison/index");
ison.CFG.quotes.add("%");

var real = ison.parse_from_file("quote.ison");

var should_be = [ 'a\t\x0B\tb', 'cde', 'fgh', 'ijk', 'lmnopq', 'rst \n uvw \n xyz' ]

function eq() {
    let rslt = true;
    for(let i=0;i<real.length;i++) {
        if(real[i] !== should_be[i]){
            return(false)
        }
    }
    return(rslt)
}

if(eq()) {
    console.log(real)
} else {
    console.log(real,should_be);
    throw(new Error("error"))
}
