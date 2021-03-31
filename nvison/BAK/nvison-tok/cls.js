const {TYPE_DICT} = require("./typdef");

class _Comma {
    constructor() {
        this.type = TYPE_DICT.comma 
    }
}

const comma = new _Comma();

class _Colon {
    constructor() {
        this.type = TYPE_DICT.colon
    }
}


const colon = new _Colon();

class Alblk {
    constructor(ch) {
        this.type = TYPE_DICT.alblk
        this.ch = ch
    }
}

class Arblk {
    constructor(ch) {
        this.type = TYPE_DICT.arblk
        this.ch = ch
    }
}

class Olblk {
    constructor(ch) {
        this.type = TYPE_DICT.olblk
        this.ch = ch
    }
}

class Orblk {
    constructor(ch) {
        this.type = TYPE_DICT.orblk
        this.ch = ch
    }
}


class Quoted {
    constructor(s) {
        this.type = TYPE_DICT.quoted
        this.str = s;
    }
}

class Word {
    constructor(s) {
        this.type = TYPE_DICT.word
        this.str = s;
    }
}

class Str {
    constructor(s) {
        this.type = TYPE_DICT.str
        this.str = s;
    }
}

class Lcmt {
    constructor(s) {
        this.type = TYPE_DICT.lcmt
        this.str = s;
    }
}

class Blkcmt {
    constructor(s) {
        this.type = TYPE_DICT.blkcmt
        this.str = s;
    }
}

class Ref {
    constructor(s) {
        this.type = TYPE_DICT.ref
        this.str = s;
    }    
}

class Hash {
    constructor(s) {
        this.type = TYPE_DICT.hash
        this.str = s;
    }
}



module.exports = {
    comma,
    colon,
    Alblk,
    Arblk,
    Olblk,
    Orblk,
    Quoted,
    Word,
    Str,
    Ref,
    Hash
}
