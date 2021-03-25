`
{
    "total_rows": 129  ,  //line comment here
    /*
        block comment here
    */
    "offset": 0,  //line comment here
    "rows": [
        {
            /*text  comment*/
            "id": /*@before_val comment*/  "change1_0.6995461115147918",
             /*text  comment*/
            "key"   : "change1_0.6995461115147918"  /*@after_val comment*/  ,
            /*text  comment*/
            "value" /*key comment*/  : {
                "rev": "1-e240bae28c7bb3667f02760f6398d508"
            },
            /*text  comment*/
            "doc"  /*key comment*/  : {
                "_id": "change1_0.6995461115147918",
                "_rev": "1-e240bae28c7bb3667f02760f6398d508",
                "hello": 1
            }
        }
    ]
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

var rt = parse_from_file("./comment.json")
console.log(JSON.stringify(rt.value,null,4))
/*
[
    {
        "total_rows": 129,
        "offset": 0,
        "rows": [
            {
                "id": "change1_0.6995461115147918",
                "key": "change1_0.6995461115147918",
                "value": {
                    "rev": "1-e240bae28c7bb3667f02760f6398d508"
                },
                "doc": {
                    "_id": "change1_0.6995461115147918",
                    "_rev": "1-e240bae28c7bb3667f02760f6398d508",
                    "hello": 1
                }
            }
        ]
    }
]


*/

var ggg = gen_from_file("./comment.json")
var arr = Array.from(ggg)
var vals = arr.map(r=>r.value) 
var seqs = arr.map(r=>r.$sibseq()) 
var keys = arr.map(r=>r.key) 
var entries  = arr.map(r=>[r.value,r.key]) 

/*
> keys
[
  'total_rows',  'offset',
  'id',          'key',
  'rev',         'value',
  '_id',         '_rev',
  'hello',       'doc',
  Symbol(empty), 'rows',
  Symbol(empty)
]
> seqs
[
  0, 1, 0, 1, 0, 2,
  0, 1, 2, 3, 0, 2,
  0
]
> entries
[
  [ 129, 'total_rows' ],
  [ 0, 'offset' ],
  [ 'change1_0.6995461115147918', 'id' ],
  [ 'change1_0.6995461115147918', 'key' ],
  [ '1-e240bae28c7bb3667f02760f6398d508', 'rev' ],
  [ { rev: '1-e240bae28c7bb3667f02760f6398d508' }, 'value' ],
  [ 'change1_0.6995461115147918', '_id' ],
  [ '1-e240bae28c7bb3667f02760f6398d508', '_rev' ],
  [ 1, 'hello' ],
  [
    {
      _id: 'change1_0.6995461115147918',
      _rev: '1-e240bae28c7bb3667f02760f6398d508',
      hello: 1
    },
    'doc'
  ],
  [
    {
      id: 'change1_0.6995461115147918',
      key: 'change1_0.6995461115147918',
      value: [Object],
      doc: [Object]
    },
    Symbol(empty)
  ],
  [ [ [Object] ], 'rows' ],
  [ { total_rows: 129, offset: 0, rows: [Array] }, Symbol(empty) ]
]
>

*/
