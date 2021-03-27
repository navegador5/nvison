const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


let real = (ison.parse_from_file("./hr3.ison",{enable_ref:true}))

function eq() {
    return(
        (real[0] === 100) &&
        (real[1] === 'k0') &&
        (real[2] === real)
    )
}

const assert = require("assert");
assert(eq(),true)
console.log(real);
