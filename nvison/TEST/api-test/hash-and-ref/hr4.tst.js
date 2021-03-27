const ison = require("/opt/JS/NV5_/nvison/nvison/index")

const path = require("path");
console.log(path.resolve(__dirname,__filename))


let real = (ison.parse_from_file("./hr4.ison",{enable_ref:true}))
function eq() {
    return(
        (real['k0'] === 'v0') 
    )
}

const assert = require("assert");
assert(eq(),true)
console.log(real);
