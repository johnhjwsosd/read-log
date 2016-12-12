'use strict';
function get(val, type) {
    if (!val) return "";
    return new Buffer(val, type ? type : 'utf8').toString('base64');
};
function utf8(val) {
    if (!val) return "";
    return new Buffer(val, 'base64').toString('utf8');
};
module.exports = {
    get: get,
    utf8: utf8
};