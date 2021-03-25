const {empty} = require("nv-facutil-basic");
const D = require("nvison-parse-d");

const comma_handle = require("./comma"); 
const colon_handle = require("./colon");
const ws_handle = require("./ws");
const quote_handle = require("./quote");
const slash_handle = require("./slash");
const lblk_handle = require("./lblk");
const rblk_handle = require("./rblk");
const hash_handle = require("./hash");
const ref_handle = require("./ref");
const others_handle = require("./others");


function *gen(g,pre_padding=empty) {
    let d = new D(g,pre_padding);
    while(true) {
        d.$next_ch();
        if(d.$is_currch_eof()) {
            d.$handle_main_eof();
            yield(d);
            break;
        } else if(d.$is_currch_comma()) {
            comma_handle(d);
            yield(d);
        } else if(d.$is_currch_colon()) {
            colon_handle(d);
            yield(d);
        } else if(d.$is_currch_ws()) {
            ws_handle(d);
            yield(d);
        } else if(d.$is_currch_quote()) {
            quote_handle(d,d.ch_cache.curr);
            yield(d);
        } else if(d.$is_currch_slash()) {
            slash_handle(d);
            yield(d);
        } else if(d.$is_currch_lblk()) {
            lblk_handle(d);
            yield(d);
        } else if(d.$is_currch_rblk()) {
            rblk_handle(d);
            yield(d);
        } else if(d.$is_currch_hash()) {
            hash_handle(d);
            yield(d);
        } else if(d.$is_currch_ref()) {
            ref_handle(d);
            yield(d);
        } else {
            others_handle(d);
            yield(d);
        }
    }
}

module.exports = gen;
