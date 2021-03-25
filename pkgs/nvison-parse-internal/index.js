const {
    sync_gen_from_str,
    sync_gen_from_file,
    async_gen_chunk_from_file,
} = require("nv-string-stream");

const {
    is_should_yield
} = require("nvison-parse-state");

const cfg = require("nvison-cfg");

const {is_nl,is_ws} = require("nv-char-whitespace");

const parser = require("nvison-parse-engine");

const OPT_DICT = {
    enable_ref:false,
    encoding:'utf8'
}

function parse_from_generator(g,opt={enable_ref:false}) {
    let ppg =parser(g);
    let d = (ppg.next().value);
    let rt = d.avnd_cache.data.$root();
    let prev = d.state;
    for(let each of ppg) {
        let curr = each.state;
        if(is_should_yield(d,prev,curr) && !opt.enable_ref){
            let nd = d.avnd_cache.data;
            nd.$disconn();
            nd = null;
        }
        prev = curr
    }
    return(rt)
}

function parse_from_str(s,opt={enable_ref:false}) {
    let g = sync_gen_from_str(s)
    return(parse_from_generator(g,opt))
}

function parse_from_file(fn,opt={enable_ref:false,encoding:'utf8'}) {
    let g = sync_gen_from_file(fn,opt.encoding)
    return(parse_from_generator(g,opt))
}

function * gen_from_generator(g,opt={enable_ref:false,encoding:'utf8'}){
    let ppg =parser(g);
    let d = (ppg.next().value);
    let prev = d.state;
    for(let each of ppg) {
        let curr = each.state;
        if(is_should_yield(d,prev,curr) && !opt.enable_ref){
            let nd = d.avnd_cache.data;
            yield(nd);
            nd.$disconn();
            nd = null;
        } else {}
        prev = curr
    }
}


function * gen_from_str(s,opt={enable_ref:false,encoding:'utf8'}) {
    let g = sync_gen_from_str(s);
    yield * gen_from_generator(g,opt);
}

function * gen_from_file(fn,opt={enable_ref:false,encoding:'utf8'}) {
    let g = sync_gen_from_file(fn,opt.encoding);
    yield * gen_from_generator(g,opt);
}


//

function _new_agen_cache() {
    let cache = {
        d:undefined,ppg:undefined,
        prev:undefined,curr:undefined,
        can_send:false,
        data:'',state:'init',label:'',pstate:''
    }
    return(cache)
}

function _agen_init(ag) {
    let syncg = sync_gen_from_str('');
    let ppg = parser(syncg,' ');
    let d = (ppg.next().value);
    d.__use_async_mode();
    let cache = _new_agen_cache();
    cache.rt = d.avnd_cache.data;
    cache.prev = d.state;
    cache.ppg = ppg;
    cache.d = d;
    return(cache)
}

function _agen_tokize(cache,ch) {
    cache.data = cache.data +ch;
    if(cache.state === 'init') {
        if(ch === cfg.slash) {
            cache.state = 'slash';
        } else if(cfg.quotes.has(ch)) {
            cache.label = ch;
            cache.state = 'quote';
        } else if(ch === cfg.hash) {
            cache.state = 'hash';
        } else if(ch === cfg.ref) {
            cache.state = 'ref';
        } else {
            cache.can_send = true;
        }
    } else if(cache.state === 'quote') {
        if(ch === '\\') {
            cache.state = 'esc';
            cache.pstate = 'quote'
        } else if(ch === cache.label) {
            if(cache.pstate!=='') {
                cache.state = cache.pstate;
                cache.pstate = ''
            } else {
                cache.can_send = true;
            }
        } else {}
    } else if(cache.state === 'slash') {
        if(ch === cfg.slash) {
            cache.state = 'lcmt';
        } else if(ch === cfg.asterisk) {
            cache.state = 'blkcmt';
        } else if(cfg.quotes.has(ch)) {
            cache.label = ch;
            cache.state = 'quote';
        } else {
            cache.can_send = true;
        }
    } else if(cache.state === 'lcmt') {
        if(ch === '\\') {
            cache.state = 'esc'
            cache.pstate = 'lcmt'
        } else if(is_nl(ch)) {
            cache.can_send = true;
        } else {
        }
    } else if(cache.state === 'blkcmt') {
        if(ch === '\\') {
            cache.state = 'esc'
            cache.pstate = 'blkcmt'
        } else if(ch === cfg.asterisk) {
            cache.state = 'asterisk';
        } else {
        }
    } else if(cache.state === 'asterisk') {
        if(ch === '\\') {
            cache.state = 'esc'
            cache.pstate = 'blkcmt'
        } else if(ch === cfg.slash) {
            cache.can_send = true;
        } else {
        }
    } else if(cache.state === 'hash') {
        if(is_ws(ch)) {
            cache.can_send = true;
        } else if(cfg.quotes.has(ch)){
            cache.state = 'quote';
            cache.pstate = 'hash'
        } else {
            
        }
    } else if(cache.state === 'ref') {
        if(is_ws(ch)){
            cache.can_send = true;
        } else if(cfg.quotes.has(ch)){
            cache.state = 'quote';
            cache.pstate = 'ref'
        } {
        }
    } else if(cache.state === 'esc') {
        cache.state = cache.pstate;
        cache.pstate = ''
    } else {
        console.log("impossible")
        //impossible
    }
    return(cache)
}


async function * _$0_yield(chunk,cache) {
    for(let ch of chunk) {
        _agen_tokize(cache,ch);
        if(cache.can_send) {
            yield(cache)
            cache.data = ''
            cache.state = 'init'
            cache.label = ''
            cache.can_send = false
        } else {}
    }
}

async function * _$1_yield(ag) {
    let cache = _agen_init(ag);
    for await (let chunk of ag) {
        yield * _$0_yield(chunk,cache);
    }
    yield(cache)
}

function _agen_pre_handle(cache) {
    let unshift_stack = cache.d.unshift_cache;
    unshift_stack.forEach(
        cher=>{
            cache.prev = cache.curr;
            cache.d = (cache.ppg.next().value)
            cache.curr = cache.d.state;
        }
    );
    unshift_stack = null;
}

async function * _agen_handle(cache,opt) {
    cache.d.__unshift_g(cache.data);
    cache.prev = cache.curr;
    cache.d = (cache.ppg.next().value);
    cache.curr = cache.d.state;
    if(is_should_yield(cache.d,cache.prev,cache.curr) && !opt.enable_ref ) {
        let nd = cache.d.avnd_cache.data;
        yield(nd);
        ////without ref
        nd.$disconn();
        nd=null;
        ////
    } else {}

}

async function * agen_from_generator(ag,opt={enable_ref:false,encoding:'utf8'}) {
    ag = _$1_yield(ag);
    let cache;
    for await (cache of ag) {
        _agen_pre_handle(cache);
        yield * _agen_handle(cache,opt);
    }
    yield(cache.rt)
}


async function * agen_from_file(fn,opt={enable_ref:false,encoding:'utf8'}) {
    let ag = async_gen_chunk_from_file(fn,opt.encoding,1024);
    yield * agen_from_generator(ag,opt);
}


module.exports = {
    OPT_DICT,
    parse_from_generator,
    parse_from_str,
    parse_from_file,
    gen_from_generator,
    gen_from_str,
    gen_from_file,
    agen_from_generator,
    agen_from_file,
}


