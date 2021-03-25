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


var ag = agen_from_file("./normal.json");
var rslt


(async () => {
    for await (let nd of ag) {
        rslt= nd.value
    }
    ag=null;
    console.log(JSON.stringify(rslt,null,4))
})();



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
            },
            {
                "id": "change2_0.6995461115147918",
                "key": "change2_0.6995461115147918",
                "value": {
                    "rev": "1-13677d36b98c0c075145bb8975105153"
                },
                "doc": {
                    "_id": "change2_0.6995461115147918",
                    "_rev": "1-13677d36b98c0c075145bb8975105153",
                    "hello": 2
                }
            }
        ]
    }
]
*/
