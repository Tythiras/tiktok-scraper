"use strict";
exports.__esModule = true;
exports.MultipleBar = void 0;
var progress_1 = require("progress");
var readline = require("readline");
var MultipleBar = /** @class */ (function () {
    function MultipleBar() {
        this.stream = process.stderr;
        this.cursor = 1;
        this.bars = [];
        this.terminates = 0;
    }
    MultipleBar.prototype.newBar = function (schema, options) {
        var _this = this;
        // eslint-disable-next-line no-param-reassign
        options.stream = this.stream;
        var bar = new progress_1["default"](schema, options);
        this.bars.push(bar);
        var index = this.bars.length - 1;
        // alloc line
        this.move(index);
        this.stream.write('\n');
        this.cursor += 1;
        // replace original
        var barObj = bar;
        barObj.otick = bar.tick;
        barObj.oterminate = bar.terminate;
        barObj.tick = function (value, opts) {
            _this.tick(index, value, opts);
        };
        barObj.terminate = function () {
            _this.terminates += 1;
            if (_this.terminates === _this.bars.length) {
                _this.terminate();
            }
        };
        return bar;
    };
    MultipleBar.prototype.terminate = function () {
        this.move(this.bars.length);
        readline.clearLine(this.stream, 0);
        if (!this.stream.isTTY)
            return;
        this.stream.cursorTo(0);
    };
    MultipleBar.prototype.move = function (index) {
        if (!this.stream.isTTY)
            return;
        this.stream.moveCursor(0, index - this.cursor);
        this.cursor = index;
    };
    MultipleBar.prototype.tick = function (index, value, options) {
        var bar = this.bars[index];
        if (bar) {
            this.move(index);
            bar.otick(value, options);
        }
    };
    return MultipleBar;
}());
exports.MultipleBar = MultipleBar;
