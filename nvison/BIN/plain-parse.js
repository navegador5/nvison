#!/usr/bin/env node
const path = require("path");
const ison = require("../index");
const fs = require("fs");

const DFLT_CFG = {
    quotes:['"',"'",'`'],
    colons:[':','='],
    commas:[',',';'],
    array_blks:[['[',']'],['(',')'],['<','>']],
    obj_blks:[['{','}']]
}

function _update_cfg(cfg) {
    /*
     * this sucks,just for compatible 
     */
    let d = JSON.parse(JSON.stringify(DFLT_CFG))
    d = Object.assign(d,cfg);
    ////
    for(let e of d.array_blks) {
        if(ison.CFG.array_blks.lhas(e[0])) {
        } else {
            ison.CFG.array_blks.add(...e)
        }
    }
    let alblks = d.array_blks.map(r=>r[0])
    for(let e of ison.CFG.array_blks) {
        if(alblks.includes(e[0])) {
        } else {
            ison.CFG.array_blks.ldelete(e[0])
        }
    }
    ////
    for(let e of d.obj_blks) {
        if(ison.CFG.obj_blks.lhas(e[0])) {
        } else {
            ison.CFG.obj_blks.add(...e)
        }
    }   
    let olblks = d.obj_blks.map(r=>r[0])
    for(let e of ison.CFG.obj_blks) {
        if(olblks.includes(e[0])) {
        } else {
            ison.CFG.obj_blks.ldelete(e[0])
        }
    }
    ////
    for(let q of d.quotes) {
        if(ison.CFG.quotes.has(q)) {
        } else {
            ison.CFG.quotes.add(q)
        }
    }
    let qs = d.quotes;
    for(let q of ison.CFG.quotes) {
        if(qs.includes(q)) {
        } else {
            ison.CFG.quotes.delete(q)
        }
    }
    ////
    for(let cl of d.colons) {
        if(ison.CFG.colons.has(cl)) {
        } else {
            ison.CFG.colons.add(cl)
        }
    }
    let cls = d.colons;
    for(let cl of ison.CFG.colons) {
        if(cls.includes(cl)) {
        } else {
            ison.CFG.colons.delete(cl)
        }
    }
    ///
    for(let cm of d.commas) {
        if(ison.CFG.commas.has(cm)) {
        } else {
            ison.CFG.commas.add(cm)
        }
    }
    let cms = d.commas;
    for(let cm of ison.CFG.commas) {
        if(cms.includes(cm)) {
        } else {
            ison.CFG.commas.delete(cm)
        }
    }
    ////
}


function usage () {
    console.log(
        `
  Usage: nvison_parse [options] <file>
  If <file> is not provided, then STDIN is used.
  Options:
    -c, --config [file]      config default see below
    -e, --encoding           default utf8
    -o, --output [file]      Output to the specified file, otherwise STDOUT
    -h, --help               Output usage information`
    )
   console.log("\n");
   console.log("---default config---");
   console.log(DFLT_CFG);
   console.log("---default config---");
}




var argv = require('minimist')(
    process.argv.slice(2),
    {
        alias: {
            'config':'c',
            'output':'o',
            'help':'h',
            'encoding':'e',
        },
        default: {
            'encoding':'utf8',
        },
        string:[
            'output',
            'encoding',
            'config'
        ]
    }
);


function update_cfg(argv) {
    let cfg = argv.config
    if(!cfg) {
        cfg = JSON.parse(JSON.stringify(DFLT_CFG));
    } else {
        cfg = JSON.parse(fs.readFileSync(cfg,argv.encoding))
    }
    _update_cfg(cfg);    
}

function get_input_rs$(argv) {
    let input = argv._[0]
    let rs$;
    if(input) {
        rs$ = fs.createReadStream(input,{encoding:argv.encoding});
    } else {
        rs$ = process.stdin;
    }
    return(rs$)    
}


if (argv.help) {
    usage();
} else {
    update_cfg(argv);
    let rs$ = get_input_rs$(argv);
    let code = '';
    rs$.on('data',data=>{code=code+data})
    rs$.on(
        'end',
        ()=>{
            let rslt = ison.parse_from_str(code,{enable_ref:true,encoding:argv.encoding});
            let json = JSON.stringify(rslt, null, 4);
            if(!argv.output) {
                let ws$ = process.stdout;
                ws$.write(json+'\n')
            } else {
                fs.writeFileSync(pathargv.output,json)
            }
        }
    )
}


