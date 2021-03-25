
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




var ag = agen_from_file("./primitive.json");
var rslt


(async () => {
    for await (let nd of ag) {
        rslt= nd.value
    }
    ag=null;
    console.log(rslt)
})();


/*
[
  {
    'normal-num': [
      175,
      4353,
      13,
      577,
      -123120,
      -347.85054261852173,
      134.89628825916535
    ],
    'special-num': [ Infinity, -Infinity, NaN ],
    bigint: [ 1234567891234567889123456789n, 1234567891234567889123456789n ],
    'str-str': [ 'abc', 'def\tsquoted', 'd    quoted', 'tock-quoted' ],
    'str@concat@str': 'prefix\t\x0B\bsuffix'
  }
]
*/
