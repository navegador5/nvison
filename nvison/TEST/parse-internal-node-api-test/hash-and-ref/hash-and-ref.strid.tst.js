const {
    parse_from_generator,
    parse_from_str,
    parse_from_file,
    gen_from_generator,
    gen_from_str,
    gen_from_file,
    agen_from_file
} = require("nvison-parse-internal");

const {
    sync_gen_from_str,
    sync_gen_from_file,
    async_gen_from_file
} = require("nv-string-stream");


var ag = agen_from_file("./hash-and-ref.strid.json");
var rslt


(async () => {
    for await (let nd of ag) {
        rslt= nd.value
    }
    //ag=null;
    //console.log(count)
    console.log(JSON.stringify(rslt,null,4))
})();


/*
 > [
    "https://127.0.0.1/img.jpg",
    "https://127.0.0.1/img.png",
    "this is a very long \nvery long string\n...string",
    [
        "this is a very long \nvery long string\n...string",
        "this is a very long \nvery long string\n...string",
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
