/*
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
]

*/

const {
    parse_from_generator,
    parse_from_str,
    parse_from_file,
    gen_from_generator,
    gen_from_str,
    gen_from_file
} = require("nvison-parse-internal")

const {
    sync_gen_from_str,
    sync_gen_from_file
} = require("nv-string-stream");

var rt = parse_from_file("./arr0.json")
console.log(JSON.stringify(rt.value,null,4))
/*
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

*/

var ggg = gen_from_file("./arr0.json")
var arr = Array.from(ggg)
var vals = arr.map(r=>r.value) 
var seqs = arr.map(r=>r.$sibseq()) 

/*
> seqs
[
  0, 1, 0, 2, 0, 0, 0, 1, 1,
  0, 1, 0, 0, 1, 1, 0, 1, 2,
  2, 0, 0, 0, 1, 1, 0, 1, 2,
  2, 1, 2, 3, 2, 3, 0
]
> vals
[
  'defun',
  'last-state',
  'rewindable',
  [ 'rewindable' ],
  'let',
  'size',
  'rewind-count',
  'rewindable',
  [ 'rewind-count', 'rewindable' ],
  [ 'size', [ 'rewind-count', 'rewindable' ] ],
  [ [ 'size', [Array] ] ],
  'if',
  'zerop',
  'size',
  [ 'zerop', 'size' ],
  'values',
  'nil',
  'nil',
  [ 'values', 'nil', 'nil' ],
  'values',
  'aref',
  'rewind-store',
  'rewindable',
  [ 'rewind-store', 'rewindable' ],
  1,
  '-',
  'size',
  [ 1, '-', 'size' ],
  [ 'aref', [ 'rewind-store', 'rewindable' ], [ 1, '-', 'size' ] ],
  't',
  [ 'values', [ 'aref', [Array], [Array] ], 't' ],
  [
    'if',
    [ 'zerop', 'size' ],
    [ 'values', 'nil', 'nil' ],
    [ 'values', [Array], 't' ]
  ],
  [ 'let', [ [Array] ], [ 'if', [Array], [Array], [Array] ] ],
  [
    'defun',
    'last-state',
    [ 'rewindable' ],
    [ 'let', [Array], [Array] ]
  ]
]
>
*/
