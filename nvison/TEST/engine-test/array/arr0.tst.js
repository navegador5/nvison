`
    [
        defun last-state <rewindable>
        (
            let 
            (
                (size <rewind-count rewindable>)
            )
            [
                if(zerop size) <values nil nil>
                [
                    values 
                    [aref <rewind-store rewindable> <1 - size>]
                    t
                ]
            ]
        )
    ];
    
`




const _STATE = require("nvison-parse-state");
const gtv = _STATE.gtv;
const STATE = _STATE.STATE_DICT;
const LEFTED_TYPE = _STATE.LEFTED_TYPE;
const AVND_CACHE_STATE_DICT = _STATE.AVND_CACHE_STATE_DICT;

const typdef = require("nvison-obj-typedef");
const cfg = require("nvison-cfg");
const scope = require("nvison-parse-scope");


const {
    sync_gen_from_str,
    sync_gen_from_file
} = require("nv-string-stream");

var g = sync_gen_from_file("./arr0.json")

const parser = require("nvison-parse-engine")


var pp =parser(g)
var d = (pp.next().value)
var rt = d.avnd_cache.data;
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<20;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)

console.log(JSON.stringify(rt.value,null,4))

/*
> rt.value
[
    [
        "defun",
        "last-state",
        [
            "rewindable"
        ],
        [
            "let",
            [
                [
                    "size",
                    [
                        "rewind-count",
                        "rewindable"
                    ]
                ]
            ],
            [
                "if",
                [
                    "zerop",
                    "size"
                ],
                [
                    "values",
                    "nil",
                    "nil"
                ],
                [
                    "values",
                    [
                        "aref",
                        [
                            "rewind-store",
                            "rewindable"
                        ],
                        [
                            1,
                            "-",
                            "size"
                        ]
                    ],
                    "t"
                ]
            ]
        ]
    ]
]

>

*/
