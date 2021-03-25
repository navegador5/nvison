/*
[
   (a b c d)
   (e f <g h>)
   (
       <some>
       <some>
       <some>
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

var rt = parse_from_file("./arr1.json")
console.log(JSON.stringify(rt.value,null,4))
/*
> rt.value
[
  [
    [ 'a', 'b', 'c', 'd' ],
    [ 'e', 'f', [Array] ],
    [ [Array], [Array], [Array] ]
  ]
]
>

*/

var ggg = gen_from_file("./arr1.json")
var nd = (ggg.next().value)
var arr = Array.from(ggg)
var vals = arr.map(r=>r.value) 
var seqs = arr.map(r=>r.$sibseq()) 

/*
>seqs
[
  0, 1, 2, 3, 0, 0, 1,
  0, 1, 2, 1, 0, 0, 0,
  1, 0, 2, 2, 0
]

> vals
[
  'a',
  'b',
  'c',
  'd',
  [ 'a', 'b', 'c', 'd' ],
  'e',
  'f',
  'g',
  'h',
  [ 'g', 'h' ],
  [ 'e', 'f', [ 'g', 'h' ] ],
  'some',
  [ 'some' ],
  'some',
  [ 'some' ],
  'some',
  [ 'some' ],
  [ [ 'some' ], [ 'some' ], [ 'some' ] ],
  [
    [ 'a', 'b', 'c', 'd' ],
    [ 'e', 'f', [Array] ],
    [ [Array], [Array], [Array] ]
  ]
]
>

entries
[
  [ 'a', Symbol(empty) ],
  [ 'b', Symbol(empty) ],
  [ 'c', Symbol(empty) ],
  [ 'd', Symbol(empty) ],
  [ [ 'a', 'b', 'c', 'd' ], Symbol(empty) ],
  [ 'e', Symbol(empty) ],
  [ 'f', Symbol(empty) ],
  [ 'g', Symbol(empty) ],
  [ 'h', Symbol(empty) ],
  [ [ 'g', 'h' ], Symbol(empty) ],
  [ [ 'e', 'f', [Array] ], Symbol(empty) ],
  [ 'some', Symbol(empty) ],
  [ [ 'some' ], Symbol(empty) ],
  [ 'some', Symbol(empty) ],
  [ [ 'some' ], Symbol(empty) ],
  [ 'some', Symbol(empty) ],
  [ [ 'some' ], Symbol(empty) ],
  [ [ [Array], [Array], [Array] ], Symbol(empty) ],
  [ [ [Array], [Array], [Array] ], Symbol(empty) ]
]
*/
