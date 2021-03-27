nvison
============
- another json
- undefined
- bin
- hex
- oct
- scientific-notation
- bigInt
- Infinity
- NaN
- concatable-string
- comments
- hash
- ref
- optional-quote
- configurable-colons
- configurable-commas
- configurable-quotes
- configurable-array-blk
- configurable-object-blk
- post-dfs-generator


install
=======
- npm install nvison


requirements
============

- node need V15+ , coz it USE Event-Target



usage
=====

    const ison = require("nvison");

parse
=====

examples
--------

### undefined

    const ison = require("./index");
    var code = `[undefined,null,true,false]`
    var j = ison.parse_from_str(code)
    > j
    [ undefined, null, true, false ]
    >

### number

    var code = `
        [
            175 ,0x1101, 0b1101, 0o1101,
            -123.12e3, -1.1e2.5, .1E3.13,
            1234567891234567889123456789n,
            +Infinity, -Infinity, NaN
        ]
    `
    var j = ison.parse_from_str(code)

    /*
    > j
    [
      175,
      4353,
      13,
      577,
      -123120,
      -347.85054261852173,
      134.89628825916535,
      1234567891234567889123456789n,
      Infinity,
      -Infinity,
      NaN
    ]
    >
    */



### string 

    var code = `
        [
            abc-def,
            'def\tsquoted',
            "d    quoted",
            \`tock-quoted-line\ntock-quoted-line\`,
            str"@auto-concat@"str
        ]
    `
    var j = ison.parse_from_str(code)
    
    /*
        [
          'abc-def',
          'def\tsquoted',
          'd    quoted',
          'tock-quoted-line\ntock-quoted-line',
          'str@auto-concat@str'
        ]
    */


### commas 

- commas is optional
- support mixed-style
- by default it is  ","  ";"  and white-spaces
- its configurable: must-be-one-char 


#### 

    var code = `
        [1 2 3 a b c]
        
        [1,2,3,a,b,c]
        
        [1;2;3;a;b;c]
        
        [1 2,3;a b,c]
    `
    var j = ison.parse_from_str(code)
    
    /*
        [
          [ 1, 2, 3, 'a', 'b', 'c' ],
          [ 1, 2, 3, 'a', 'b', 'c' ],
          [ 1, 2, 3, 'a', 'b', 'c' ],
          [ 1, 2, 3, 'a', 'b', 'c' ]
        ]
    */

####  self-define


    //for example, I add a chinese period "。"  as a comma

    > ison.CFG.commas
    Set(2) { ',', ';' }
    >
    > ison.CFG.commas.add("。")
    > ison.CFG.commas
    Set(3) { ',', ';', '。' }
    >

    var code = `[i,you,he; yo,tú,Él; 我。你。他;]`

    var j = ison.parse_from_str(code)

    /*
       [
         'i',  'you', 'he',
         'yo', 'tú',  'Él',
         '我', '你',  '他'
       ]
    */


### colons

- colons is mandatory
- support mixed-style
- by default it is  ":" and  "="
- its configurable,must-be-one-char

####

    var code = `
        {a:b,c:d,e:f}
        {a=b,c=d,e=f}
        {a:b c=d,e=f; g:h}
    `
    

    var j = ison.parse_from_str(code)
    
    /*
       [
         { a: 'b', c: 'd', e: 'f' },
         { a: 'b', c: 'd', e: 'f' },
         { a: 'b', c: 'd', e: 'f', g: 'h' }
       ]
    */
  

#### self-define  

    ison.CFG.colons
    Set(2) { ':', '=' }

    ison.CFG.colons.add("|")
    Set(3) { ':', '=', '|' }


    var code = `
        { a|b,c|d,e|f }
    `
    
    var j = ison.parse_from_str(code)
    
    /*
        { a: 'b', c: 'd', e: 'f' }
    */    
    


####  Error auto recover

- colon before key will be treated as  whitespace
- multi-colons before value will be treated as  one
- colons following value  will be dropped
- unfinished key:value pair  will be dropped

#####

    //colon before key will be treated as  whitespace

    { a:b, : key : value}   ->  { a: 'b', key: 'value' }

    //multi-colons before value will be treated as  one

    { a:b, key ::::value }   ->  { a: 'b', key: 'value' }
    [100, ::::xy]            ->  [ 100, 'xy' ]

    //colons following value  will be dropped

    [abc::: 123]                   ->  [ 'abc', 123 ],
    {k:abc:::, k2:v2}              ->  { k: 'abc', k2: 'v2' }
    [abc : 666]                    ->  [ 'abc', 666 ]
    {k:v, key:value  : 100:200}    ->  { '100': 200, k: 'v', key: 'value' }


    //unfinished k:v  will be dropped
    {k:abc:, k2,  k3:v3}    -> { k: 'abc', k3: 'v3' }
    {k:abc:, k2:, k3:v3}    -> { k: 'abc', k3: 'v3' }
    {k:abc:, k2 :,k3:v3}    -> { k: 'abc', k3: 'v3' }




### quotes

- quotes is optional if without escape
- support mixed-style
- by default it is  "'" and  '"'  and '`'
- its configurable,must-be-one-char, except '`', '`' is reservered for future-using
- currently NOT support string-literal-template
- auto concat

####
    

    > ison.CFG.quotes
    Set(3) { '"', "'", '`' }
    > ison.CFG.reserved
    [ '/', '*', '#', '&', '`' ]
    > ison.CFG.quotes.add("%")
    > ison.CFG.quotes
    Set(4) { '"', "'", '`', '%' }
    >

    var code = `
        [
            a"\t\v\t"b,
            "cde",
            fgh,
            'ijk',
            %lmnopq%,
            \`rst \n uvw \n xyz\`
        ]
    `

    var j = ison.parse_from_str(code)

    /*
        [ 'a\t\x0B\tb', 'cde', 'fgh', 'ijk', 'lmnopq', 'rst \n uvw \n xyz' ]
    */


###  comments 

- two kind :  line-comment(//....\n)  and block-comment(/*.....*/)
- four position supported: @after\_key, @before\_val(properties), @after\_val, @before\_val(elements)


#### valid and invalid comment

    // VALID 
    {
        .....
        /*text-node-comment*/ 

        key /*key-comment*/   :  /* before-val-comment*/  value  /*after-val-comment*/ ,

        /*text-node-comment*/

        key1 : value1,

        /*text-node-comment*/
        .....
    }
    
    [
        .....
        /*text-node-comment*/
        element0   /*after-val-comment*/ ,
        /*text-node-comment*/ 
        ....
    ]
    //VALID

    //INVALID
    [  abc/*in-value-comment-not-supported*/def, ....]
        
        it will be treated as  [ abc, def ....]


    {  kkkk/*in-key-comment-not-supported*/ey : value, ...}

        it will be treadted as  { ey:value,....} ,
        the pre-part of kkkkey(kkkk)  will be dropped 

    //INVALID


####

    var code = `
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
    


    var j = ison.parse_from_str(code)
    
    /*
        {
          total_rows: 129,
          offset: 0,
          rows: [
            {
              id: 'change1_0.6995461115147918',
              key: 'change1_0.6995461115147918',
              value: [Object],
              doc: [Object]
            }
          ]
        }
    */


### array

- support mixed-style
- by default it is  "[]" and  '()'  and '<>'
- its configurable,must-be-one-char-pair 


#### 

    ison.CFG.array_blks
    > Map(3) { '[' => ']', '(' => ')', '<' => '>' }

    ison.CFG.array_blks.add("【","】")
    ison.CFG.array_blks.add("《","》")
    > Map(5) { '[' => ']', '(' => ')', '<' => '>', '【' => '】', '《' => '》' }


    var code = `
        defun last-state <rewindable>
        【
            let
            [
                (size <rewind-count rewindable>)
            ]
            [
                if<zerop size> <values nil nil>
                (
                    values
                    <aref 《rewind-store rewindable》 《1 - size》>
                    t
                )
            ]
        】

    `


    var j = ison.parse_from_str(code)
    /*
    [
      'defun',
      'last-state',
      [ 'rewindable' ],
      [ 'let', [ [Array] ], [ 'if', [Array], [Array], [Array] ] ]
    ]
    */



### dict(object)    

- support mixed-style
- by default it is  "{}" 
- its configurable,must-be-one-char-pair


####

    ison.CFG.obj_blks
    ison.CFG.obj_blks.add('^','$')
    
    var code = `
        {
            a:b;
            c=d;
            e= {
                f:[1 2 3],
                g= ^ key:g,value:200 $
            }
        }
    `
    


    var j = ison.parse_from_str(code)
    /*
    {
      "a": "b",
      "c": "d",
      "e": {
        "f": [
          1,
          2,
          3
        ],
        "g": {
          "key": "g",
          "value": 200
        }
      }
    }
    */


### hash and ref

- pass {enable\_ref:true}
- hash can add more-than-one "key" to a value, for reference
- ref will search  along the "scope" chain, recursively
- ref can NOT  ref "behind" to right-sibling and children and descendants
- coz ison originally is used for streaming parse, it did NOT known what will come
- hash and ref performance is BAD when the ison-file is too Big,such as 4M+


#### valid and invalid

    //valid 
    {  #root
       
       key0: {k0:v0, k1:&root}  //ref to ancestor
       
       key1: value1,

       key2: &key0             //ref to preceding-sibling 

    } //will  be  {key0: {k0:v0,k1:<Circular>}, key1:value1,key2:{k0:v0,k1:<Circular>}}


    {
        ....
        key0  :  value0 #hash-after-val ,

        key1 : &hash-after-val
        ....
    }   // will be  {key0:value0, key1:value0}



    /* very very long string */  #comment

    [ &comment, &comment ,&comment]   //valid to ref to text-node-position-comment

     




    //invalid

    {
        key0  #hash-after-key-will-be-treated-as-comment  :  value0
    }


    {
        key0  :  #hash-before-value-will-be-treated-as-comment value0
    }


    {
        key0: &fsib,            //ref to following-sibling have no effect
        key1: value1,
        key2: value2 #fsib,

        key3: {
            k30:&des,           //ref to descendant have no effect
            k31: [
               des0,
               des1,
               des2  #des
            ]
        }

    }

    {
        k :  /*before_val*/ #hash  v     //hash between colon and value have no effect  
    }

    


#### example 1

  
    
    var code = `
        {
            arr: [1,2,3,4]  #ary0 ,
            x: &ary0 ,
            y: {
                k0:abcdefghijklmnopqrstuvwxyz,
                k1:&ary0,
                k2:&x,             //ref to x, it will be reursively point to [1,2,3,4]
                k3:&k0,            //along the scope(ArrayBlock or ObjectBlock), it will be point to abcdefghijklmnopqrstuvwxyz
                k4:&0             //if the ref is a number, it will be the sibling-position, it will be point to abcdefghijklmnopqrstuvwxyz
            }
        }
    `
    


    var j = ison.parse_from_str(code,{enable_ref:true})

    /*
    {
      arr: [ 1, 2, 3, 4 ],
      x: [ 1, 2, 3, 4 ],
      y: {
        k0: 'abcdefghijklmnopqrstuvwxyz',
        k1: [ 1, 2, 3, 4 ],
        k2: [ 1, 2, 3, 4 ],
        k3: 'abcdefghijklmnopqrstuvwxyz',
        k4: 'abcdefghijklmnopqrstuvwxyz'
      }
    }
    */

    > j.x === j.arr
    true
    > j.y.k1 === j.arr
    true
    > j.y.k2 === j.arr
    true
    >

#### example 2

    
    var code = `
        //use hash '#' to set a alias for ref
        
        "https://127.0.0.1/img.jpg"    #jpg
        "https://127.0.0.1/img.png"    #png
        
        
        //multi-hash permitted : the below has two hash
        
        \`this is a very long
        very long string
        ...string\`                     #long-string   #so-long
        
        
        
        [
            // different hashes point to the same value
            &long-string;
            &so-long;
        
            /*html-like, use ref '&' to get-value-of  value-with-hash */
            {
                div@1: {
                    attribs:{style={}}
                } #div ,
        
                div@2: &div,
                div@3: &div,
                div@4: &div,
        
                img@1: &jpg,
                img@2: &png,
        
            } #body;
        
            /*repeat the body*/
        
            &body;
        
        ] #html
    `
    var j = ison.parse_from_str(code,{enable_ref:true})

    /*
        > j
        [
          'https://127.0.0.1/img.jpg',
          'https://127.0.0.1/img.png',
          'this is a very long\n        very long string\n        ...string',
          [
            'this is a very long\n        very long string\n        ...string',
            'this is a very long\n        very long string\n        ...string',
            {
              'div@1': [Object],
              'div@2': [Object],
              'div@3': [Object],
              'div@4': [Object],
              'img@1': 'https://127.0.0.1/img.jpg',
              'img@2': 'https://127.0.0.1/img.png'
            },
            {
              'div@1': [Object],
              'div@2': [Object],
              'div@3': [Object],
              'div@4': [Object],
              'img@1': 'https://127.0.0.1/img.jpg',
              'img@2': 'https://127.0.0.1/img.png'
            }
          ]
        ]
        >
    */

     console.log(JSON.stringify(j,null,2))

    /*
        [
          "https://127.0.0.1/img.jpg",
          "https://127.0.0.1/img.png",
          "this is a very long\n        very long string\n        ...string",
          [
            "this is a very long\n        very long string\n        ...string",
            "this is a very long\n        very long string\n        ...string",
            {
              "div@1": {
                "attribs": {
                  "style": {}
                }
              },
              "div@2": {
                "attribs": {
                  "style": {}
                }
              },
              "div@3": {
                "attribs": {
                  "style": {}
                }
              },
              "div@4": {
                "attribs": {
                  "style": {}
                }
              },
              "img@1": "https://127.0.0.1/img.jpg",
              "img@2": "https://127.0.0.1/img.png"
            },
            {
              "div@1": {
                "attribs": {
                  "style": {}
                }
              },
              "div@2": {
                "attribs": {
                  "style": {}
                }
              },
              "div@3": {
                "attribs": {
                  "style": {}
                }
              },
              "div@4": {
                "attribs": {
                  "style": {}
                }
              },
              "img@1": "https://127.0.0.1/img.jpg",
              "img@2": "https://127.0.0.1/img.png"
            }
          ]
        ]
    */


### generator

- in-post-dfs sequence 
- async\_gen only support from\_file

#### sync gen

    var code = `
        {
            a:[1,2,3],
            b:{k0:v0,k1:v1,k2:v2},
        }
    `

    var g = ison.gen_from_str(code)

    > Array.from(g)
    [
      [ Symbol(empty), 1 ],
      [ Symbol(empty), 2 ],
      [ Symbol(empty), 3 ],
      [ 'a', [ 1, 2, 3 ] ],
      [ 'k0', 'v0' ],
      [ 'k1', 'v1' ],
      [ 'k2', 'v2' ],
      [ 'b', { k0: 'v0', k1: 'v1', k2: 'v2' } ],
      [ Symbol(empty), { a: [Array], b: [Object] } ]
    ]
    
    
### async
    

    var ag = ison.agen_from_file("./gen.ison");
    (
        async() => {
            for await(let entry of ag) {
                console.log(entry)
            }
        }
    )();
    /*
        [ Symbol(empty), 1 ]
        [ Symbol(empty), 2 ]
        [ 'k0', 'v0' ]
        [ 'k1', 'v1' ]
        [
          Symbol(empty),
          { a: [ 1, 2, 3 ], b: { k0: 'v0', k1: 'v1', k2: 'v2' } }
        ]
        [ Symbol(empty), [ { a: [Array], b: [Object] } ] ]
    */         





CFG
===

    > ison.CFG
    [
      ‍ [fixed] {
        hash: '#',
        ref: '&',
        tmpl_quote: '`',
        slash: '/',
        asterisk: '*',
        line_comment: '//',
        blk_comments: [ '/*', '*/' ]
      },
      ‌ [configurable-if-not-reserved] {
        obj_blks: Map(1) { '{' => '}' },
        array_blks: Map(3) { '[' => ']', '(' => ')', '<' => '>' },
        quotes: Set(3) { '"', "'", '`' },
        commas: Set(2) { ',', ';' },
        colons: Set(2) { ':', '=' }
      },
      ‍ [reserved] { reserved: [ '/', '*', '#', '&', '`' ] }
    ]
    >

    > ison.OPT_DICT
    { enable_ref: false, encoding: 'utf8' }
    >



APIS
====

parse
-----

- function parse\_from\_generator(g,opt={enable\_ref:false})
- function parse\_from\_str(s,opt={enable\_ref:false})
- function parse\_from\_file(fn,opt={enable\_ref:false,encoding:'utf8'})
- function * gen\_from\_generator(g,opt={enable\_ref:false,encoding:'utf8'})
- function * gen\_from\_str(s,opt={enable\_ref:false,encoding:'utf8'})
- function * gen\_from\_file(fn,opt={enable\_ref:false,encoding:'utf8'})
- async function * agen\_from\_generator(ag,opt={enable\_ref:false,encoding:'utf8'})
- async function * agen\_from\_file(fn,opt={enable\_ref:false,encoding:'utf8'})



CLI
===

parse
-----
    
    npm install nvison -g 


### plain without color

#### with input-file

          Usage: nvison_plain_parse [options] <file>
          If <file> is not provided, then STDIN is used.
          Options:
            -c, --config [file]      config default see below
            -e, --encoding           default utf8
            -o, --output [file]      Output to the specified file, otherwise STDOUT
            -h, --help               Output usage information


        ---default config---
        {
          quotes: [ '"', "'", '`' ],
          colons: [ ':', '=' ],
          commas: [ ',', ';' ],
          array_blks: [ [ '[', ']' ], [ '(', ')' ], [ '<', '>' ] ],
          obj_blks: [ [ '{', '}' ] ]
        }
        ---default config---
       
       
#### using STDIN

    nvison_plain_parse
    
    {
        a:b;
        c=d;
        e= {
            f:[1 2 3],
            g= ^ key:g,value:200 $
        }
    }
    
    
    # ctrl+D   press ctrl+D <===============
    
    {
        "a": "b",
        "c": "d",
        "e": {
            "f": [
                1,
                2,
                3
            ],
            "g": {
                "key": "g",
                "value": 200
            }
        }
    }


TODO
====
- stringify with self-defined color
- coz the color file is too big, currently NOT expose the API ,soon 



IS IT FAST?
===========
- NO
- its suitable for config-like or html-like file 
- if file large than 4M  its slow 
- coz it has a internal structure ,and the parser parse the string-stream char-by-char
- for error tolerance and configurable operators



RESTRICT
========
- BigFloat NOT supported
- coz currently only QuickJS provide that API .

LICENSE
=======
- ISC 
