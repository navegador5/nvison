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

var g = sync_gen_from_file("./comment.json")

const parser = require("nvison-parse-engine")


var pp =parser(g)
var d = (pp.next().value)
var rt = d.avnd_cache.data;
for(let i=0;i<14;i++) {d = (pp.next().value)}
for(let i=0;i<8;i++) {d = (pp.next().value)}
for(let i=0;i<8;i++) {d = (pp.next().value)}
for(let i=0;i<7;i++) {d = (pp.next().value)}
for(let i=0;i<16;i++) {d = (pp.next().value)}
for(let i=0;i<46;i++) {d = (pp.next().value)}

for(let i=0;i<5;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}
for(let i=0;i<10;i++) {d = (pp.next().value)}


d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)
d = (pp.next().value)

console.log(JSON.stringify(rt.value,null,4))
/*
> console.log(JSON.stringify(rt.value,null,4))
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
undefined
>

*/


var sdfs = rt.$sdfs();
/*
> sdfs[3]
CommentLine [936f06f3] {
  key: Symbol(empty),
  value: 'line comment here',
  type: 19,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
>

> sdfs[4]
CommentBlock [fa7a99ce] {
  key: Symbol(empty),
  value: '\n        block comment here\n    ',
  type: 24,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
>

> sdfs[6]
CommentLine [1c5a7f05] {
  key: Symbol(empty),
  value: 'line comment here',
  type: 19,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
>

> sdfs[9]
CommentBlock [7e93b2f3] {
  key: Symbol(empty),
  value: 'text  comment',
  type: 24,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
>
> sdfs[10].bvcmt[0]
CommentBlock [4ca1c95f] {
  key: Symbol(empty),
  value: '@before_val comment',
  type: 26,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
>

> sdfs[11]
CommentBlock [59fcd365] {
  key: Symbol(empty),
  value: 'text  comment',
  type: 24,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
> sdfs[12]
StringLiteral [58c4170c] {
  key: 'key',
  value: 'change1_0.6995461115147918',
  type: 12,
  chtype: 16,
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: [
    CommentBlock [59609ae8] {
      key: Symbol(empty),
      value: '@after_val comment',
      type: 25,
      chtype: Symbol(empty),
      hashes: Set(0) {},
      kcmt: [],
      bvcmt: [],
      avcmt: []
    }
  ]
}
>
> sdfs[13]
CommentBlock [1cd666d8] {
  key: Symbol(empty),
  value: 'text  comment',
  type: 24,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
> sdfs[14]
ObjectExpression [7b552ed1] {
  key: 'value',
  value: { rev: '1-e240bae28c7bb3667f02760f6398d508' },
  type: 15,
  chtype: 16,
  hashes: Set(0) {},
  kcmt: [
    CommentBlock [18715109] {
      key: Symbol(empty),
      value: 'key comment',
      type: 25,
      chtype: Symbol(empty),
      hashes: Set(0) {},
      kcmt: [],
      bvcmt: [],
      avcmt: []
    }
  ],
  bvcmt: [],
  avcmt: [],
  open: '{',
  close: '}'
}
>

> sdfs[16]
CommentBlock [026b012b] {
  key: Symbol(empty),
  value: 'text  comment',
  type: 24,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
> sdfs[17].kcmt[0]
CommentBlock [8ab247f8] {
  key: Symbol(empty),
  value: 'key comment',
  type: 25,
  chtype: Symbol(empty),
  hashes: Set(0) {},
  kcmt: [],
  bvcmt: [],
  avcmt: []
}
>


*/
