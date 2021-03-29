"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Downloader = void 0;
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
var request_1 = require("request");
var request_promise_1 = require("request-promise");
var fs_1 = require("fs");
var bluebird_1 = require("bluebird");
var archiver_1 = require("archiver");
var socks_proxy_agent_1 = require("socks-proxy-agent");
var async_1 = require("async");
var helpers_1 = require("../helpers");
var Downloader = /** @class */ (function () {
    function Downloader(_a) {
        var progress = _a.progress, proxy = _a.proxy, noWaterMark = _a.noWaterMark, headers = _a.headers, filepath = _a.filepath, bulk = _a.bulk;
        this.progress = true || progress;
        this.progressBar = [];
        this.noWaterMark = noWaterMark;
        this.headers = headers;
        this.filepath = filepath;
        this.mbars = new helpers_1.MultipleBar();
        this.proxy = proxy;
        this.bulk = bulk;
    }
    Object.defineProperty(Downloader.prototype, "getProxy", {
        /**
         * Get proxy
         */
        get: function () {
            if (Array.isArray(this.proxy)) {
                var selectProxy = this.proxy.length ? this.proxy[Math.floor(Math.random() * this.proxy.length)] : '';
                return {
                    socks: false,
                    proxy: selectProxy
                };
            }
            if (this.proxy.indexOf('socks4://') > -1 || this.proxy.indexOf('socks5://') > -1) {
                return {
                    socks: true,
                    proxy: new socks_proxy_agent_1.SocksProxyAgent(this.proxy)
                };
            }
            return {
                socks: false,
                proxy: this.proxy
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add new bar to indicate download progress
     * @param {number} len
     */
    Downloader.prototype.addBar = function (type, len) {
        this.progressBar.push(this.mbars.newBar("Downloading (" + (!type ? 'WITH WM' : 'WITHOUT WM') + ") :id [:bar] :percent", {
            complete: '=',
            incomplete: ' ',
            width: 30,
            total: len
        }));
        return this.progressBar[this.progressBar.length - 1];
    };
    /**
     * Convert video file to the buffer
     * @param {*} item
     */
    Downloader.prototype.toBuffer = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var proxy = _this.getProxy;
            var r = request_1["default"];
            var barIndex;
            var buffer = Buffer.from('');
            if (proxy.proxy && !proxy.socks) {
                r = request_1["default"].defaults({ proxy: "http://" + proxy.proxy + "/" });
            }
            if (proxy.proxy && proxy.socks) {
                r = request_1["default"].defaults({ agent: proxy.proxy });
            }
            r.get({
                url: item.videoUrlNoWaterMark ? item.videoUrlNoWaterMark : item.videoUrl,
                headers: _this.headers
            })
                .on('response', function (response) {
                var len = parseInt(response.headers['content-length'], 10);
                if (_this.progress && !_this.bulk && len) {
                    barIndex = _this.addBar(!!item.videoUrlNoWaterMark, len);
                }
                if (_this.progress && !_this.bulk && !len) {
                    console.log("Empty response! You can try again with a proxy! Can't download video: " + item.id);
                }
            })
                .on('data', function (chunk) {
                if (chunk.length) {
                    buffer = Buffer.concat([buffer, chunk]);
                    if (_this.progress && !_this.bulk) {
                        barIndex.tick(chunk.length, { id: item.id });
                    }
                }
            })
                .on('end', function () {
                resolve(buffer);
            })
                .on('error', function () {
                reject(new Error("Cant download video: " + item.id + ". If you were using proxy, please try without it."));
            });
        });
    };
    /**
     * Download posts
     * if {zip} is true then zip the result else save posts to the {folder}
     */
    Downloader.prototype.downloadPosts = function (_a) {
        var _this = this;
        var zip = _a.zip, folder = _a.folder, collector = _a.collector, fileName = _a.fileName, asyncDownload = _a.asyncDownload;
        return new Promise(function (resolve, reject) {
            var saveDestination = zip ? fileName + ".zip" : folder;
            var archive = archiver_1["default"]('zip', {
                gzip: true,
                zlib: { level: 9 }
            });
            if (zip) {
                var output = fs_1.createWriteStream(saveDestination);
                archive.pipe(output);
            }
            async_1.forEachLimit(collector, asyncDownload, function (item, cb) {
                _this.toBuffer(item)
                    .then(function (buffer) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!buffer.length) return [3 /*break*/, 4];
                                item.downloaded = true;
                                if (!zip) return [3 /*break*/, 1];
                                archive.append(buffer, { name: item.id + ".mp4" });
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, bluebird_1.fromCallback(function (cback) { return fs_1.writeFile(saveDestination + "/" + item.id + ".mp4", buffer, cback); })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [3 /*break*/, 5];
                            case 4:
                                item.downloaded = false;
                                _a.label = 5;
                            case 5:
                                cb(null);
                                return [2 /*return*/];
                        }
                    });
                }); })["catch"](function () {
                    item.downloaded = false;
                    cb(null);
                });
            }, function (error) {
                if (error) {
                    return reject(error);
                }
                if (zip) {
                    archive.finalize();
                    archive.on('end', function () { return resolve(''); });
                }
                else {
                    resolve('');
                }
            });
        });
    };
    /**
     * Download single video without the watermark
     * @param post
     */
    Downloader.prototype.downloadSingleVideo = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var proxy, url, options, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proxy = this.getProxy;
                        url = post.videoUrlNoWaterMark;
                        if (!url) {
                            url = post.videoUrl;
                        }
                        options = __assign(__assign({ uri: url, method: 'GET', headers: this.headers, encoding: null }, (proxy.proxy && proxy.socks ? { agent: proxy.proxy } : {})), (proxy.proxy && !proxy.socks ? { proxy: "http://" + proxy.proxy + "/" } : {}));
                        return [4 /*yield*/, request_promise_1["default"](options)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.writeFile(_this.filepath + "/" + post.id + ".mp4", result, cb); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Downloader;
}());
exports.Downloader = Downloader;
