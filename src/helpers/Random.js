"use strict";
exports.__esModule = true;
exports.makeid = void 0;
var makeid = function (len) {
    var text = '';
    var char_list = '0123456789';
    for (var i = 0; i < len; i += 1) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
};
exports.makeid = makeid;
