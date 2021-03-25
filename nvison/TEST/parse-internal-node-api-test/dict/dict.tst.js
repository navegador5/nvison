`
{
    a:b;
    c=d;
    e= {
        f:[1 2 3],
        g={key:g,value:200}
    }
}
`


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

var ggg = gen_from_file("./dict.json")
var arr = Array.from(ggg)
var vals = arr.map(r=>r.value)
var seqs = arr.map(r=>r.$sibseq())
var keys = arr.map(r=>r.key)
var entries  = arr.map(r=>[r.value,r.key])

/*

> vals
[
  'b',
  'd',
  1,
  2,
  3,
  [ 1, 2, 3 ],
  'g',
  200,
  { key: 'g', value: 200 },
  { f: [ 1, 2, 3 ], g: { key: 'g', value: 200 } },
  { a: 'b', c: 'd', e: { f: [Array], g: [Object] } }
]
> keys
[
  'a',           'c',
  Symbol(empty), Symbol(empty),
  Symbol(empty), 'f',
  'key',         'value',
  'g',           'e',
  Symbol(empty)
]
> seqs
[
  0, 1, 0, 1, 2,
  0, 0, 1, 1, 2,
  0
]
> entries
[
  [ 'b', 'a' ],
  [ 'd', 'c' ],
  [ 1, Symbol(empty) ],
  [ 2, Symbol(empty) ],
  [ 3, Symbol(empty) ],
  [ [ 1, 2, 3 ], 'f' ],
  [ 'g', 'key' ],
  [ 200, 'value' ],
  [ { key: 'g', value: 200 }, 'g' ],
  [ { f: [Array], g: [Object] }, 'e' ],
  [ { a: 'b', c: 'd', e: [Object] }, Symbol(empty) ]
]
>

*/
