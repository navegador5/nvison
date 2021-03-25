const ison = require("/opt/JS/NV5_/nvison/nvison/index")

var ag = ison.agen_from_file("./gen.ison");

    (
        async() => {
            for await(let entry of ag) {
                console.log(entry)
            }
        }
    )();
