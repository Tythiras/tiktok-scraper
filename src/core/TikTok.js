"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.TikTokScraper = void 0;
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-throw-literal */
/* eslint-disable no-await-in-loop */
var request_promise_1 = require("request-promise");
var os_1 = require("os");
var fs_1 = require("fs");
var json2csv_1 = require("json2csv");
var ora_1 = require("ora");
var bluebird_1 = require("bluebird");
var events_1 = require("events");
var socks_proxy_agent_1 = require("socks-proxy-agent");
var async_1 = require("async");
var constant_1 = require("../constant");
var helpers_1 = require("../helpers");
var core_1 = require("../core");
var TikTokScraper = /** @class */ (function (_super) {
    __extends(TikTokScraper, _super);
    function TikTokScraper(_a) {
        var download = _a.download, filepath = _a.filepath, filetype = _a.filetype, proxy = _a.proxy, asyncDownload = _a.asyncDownload, _b = _a.cli, cli = _b === void 0 ? false : _b, _c = _a.event, event = _c === void 0 ? false : _c, _d = _a.progress, progress = _d === void 0 ? false : _d, input = _a.input, number = _a.number, type = _a.type, _e = _a.by_user_id, by_user_id = _e === void 0 ? false : _e, _f = _a.store_history, store_history = _f === void 0 ? false : _f, _g = _a.historyPath, historyPath = _g === void 0 ? '' : _g, _h = _a.noWaterMark, noWaterMark = _h === void 0 ? false : _h, _j = _a.fileName, fileName = _j === void 0 ? '' : _j, _k = _a.timeout, timeout = _k === void 0 ? 0 : _k, _l = _a.bulk, bulk = _l === void 0 ? false : _l, _m = _a.zip, zip = _m === void 0 ? false : _m, _o = _a.test, test = _o === void 0 ? false : _o, _p = _a.hdVideo, hdVideo = _p === void 0 ? false : _p, _q = _a.webHookUrl, webHookUrl = _q === void 0 ? '' : _q, _r = _a.method, method = _r === void 0 ? 'POST' : _r, headers = _a.headers, _s = _a.verifyFp, verifyFp = _s === void 0 ? '' : _s, _t = _a.sessionList, sessionList = _t === void 0 ? [] : _t;
        var _this = _super.call(this) || this;
        _this.storeValue = '';
        _this.verifyFp = verifyFp;
        _this.mainHost = 'https://m.tiktok.com/';
        _this.headers = headers;
        _this.download = download;
        _this.filepath = process.env.SCRAPING_FROM_DOCKER ? '/usr/app/files' : filepath || '';
        _this.fileName = fileName;
        _this.json2csvParser = new json2csv_1.Parser({ flatten: true });
        _this.filetype = filetype;
        _this.input = input;
        _this.test = test;
        _this.proxy = proxy;
        _this.number = number;
        _this.zip = zip;
        _this.hdVideo = hdVideo;
        _this.sessionList = sessionList;
        _this.asyncDownload = asyncDownload || 5;
        _this.asyncScraping = function () {
            switch (_this.scrapeType) {
                case 'user':
                case 'trend':
                    return 1;
                default:
                    return 1;
            }
        };
        _this.collector = [];
        _this.event = event;
        _this.scrapeType = type;
        _this.cli = cli;
        _this.spinner = ora_1["default"]({ text: 'TikTok Scraper Started', stream: process.stdout });
        _this.byUserId = by_user_id;
        _this.storeHistory = cli && download && store_history;
        _this.historyPath = process.env.SCRAPING_FROM_DOCKER ? '/usr/app/files' : historyPath || os_1.tmpdir();
        _this.idStore = '';
        _this.userIdStore = '';
        _this.noWaterMark = noWaterMark;
        _this.maxCursor = 0;
        _this.noDuplicates = [];
        _this.timeout = timeout;
        _this.bulk = bulk;
        _this.Downloader = new core_1.Downloader({
            progress: progress,
            proxy: proxy,
            noWaterMark: noWaterMark,
            headers: headers,
            filepath: process.env.SCRAPING_FROM_DOCKER ? '/usr/app/files' : filepath || '',
            bulk: bulk
        });
        _this.webHookUrl = webHookUrl;
        _this.method = method;
        _this.httpRequests = {
            good: 0,
            bad: 0
        };
        _this.store = [];
        return _this;
    }
    Object.defineProperty(TikTokScraper.prototype, "fileDestination", {
        /**
         * Get file destination(csv, zip, json)
         */
        get: function () {
            if (this.fileName) {
                if (!this.zip && this.download) {
                    return this.folderDestination + "/" + this.fileName;
                }
                return this.filepath ? this.filepath + "/" + this.fileName : this.fileName;
            }
            switch (this.scrapeType) {
                case 'user':
                case 'hashtag':
                    if (!this.zip && this.download) {
                        return this.folderDestination + "/" + this.input + "_" + Date.now();
                    }
                    return this.filepath ? this.filepath + "/" + this.input + "_" + Date.now() : this.input + "_" + Date.now();
                default:
                    if (!this.zip && this.download) {
                        return this.folderDestination + "/" + this.scrapeType + "_" + Date.now();
                    }
                    return this.filepath ? this.filepath + "/" + this.scrapeType + "_" + Date.now() : this.scrapeType + "_" + Date.now();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TikTokScraper.prototype, "folderDestination", {
        /**
         * Get folder destination, where all downloaded posts will be saved
         */
        get: function () {
            switch (this.scrapeType) {
                case 'user':
                    return this.filepath ? this.filepath + "/" + this.input : this.input;
                case 'hashtag':
                    return this.filepath ? this.filepath + "/#" + this.input : "#" + this.input;
                case 'music':
                    return this.filepath ? this.filepath + "/music_" + this.input : "music_" + this.input;
                case 'trend':
                    return this.filepath ? this.filepath + "/trend" : "trend";
                case 'video':
                    return this.filepath ? this.filepath + "/video" : "video";
                default:
                    throw new TypeError(this.scrapeType + " is not supported");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TikTokScraper.prototype, "getApiEndpoint", {
        /**
         * Get api endpoint
         */
        get: function () {
            switch (this.scrapeType) {
                case 'user':
                    return this.mainHost + "api/post/item_list/";
                case 'trend':
                    return this.mainHost + "api/recommend/item_list/";
                case 'hashtag':
                    return this.mainHost + "api/challenge/item_list/";
                case 'music':
                    return this.mainHost + "api/music/item_list/";
                default:
                    throw new TypeError(this.scrapeType + " is not supported");
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TikTokScraper.prototype, "getProxy", {
        /**
         * Get proxy
         */
        get: function () {
            var proxy = Array.isArray(this.proxy) && this.proxy.length ? this.proxy[Math.floor(Math.random() * this.proxy.length)] : this.proxy;
            if (proxy) {
                if (proxy.indexOf('socks4://') > -1 || proxy.indexOf('socks5://') > -1) {
                    return {
                        socks: true,
                        proxy: new socks_proxy_agent_1.SocksProxyAgent(proxy)
                    };
                }
                return {
                    socks: false,
                    proxy: proxy
                };
            }
            return {
                socks: false,
                proxy: ''
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Main request method
     * @param {} OptionsWithUri
     */
    TikTokScraper.prototype.request = function (_a, bodyOnly) {
        var _this = this;
        var uri = _a.uri, method = _a.method, qs = _a.qs, body = _a.body, form = _a.form, headers = _a.headers, json = _a.json, gzip = _a.gzip, followAllRedirects = _a.followAllRedirects, _b = _a.simple, simple = _b === void 0 ? true : _b;
        if (bodyOnly === void 0) { bodyOnly = true; }
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var proxy, options, response_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proxy = this.getProxy;
                        options = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ uri: uri,
                            method: method }, (qs ? { qs: qs } : {})), (body ? { body: body } : {})), (form ? { form: form } : {})), { headers: __assign(__assign({}, this.headers), headers) }), (json ? { json: true } : {})), (gzip ? { gzip: true } : {})), { resolveWithFullResponse: true, followAllRedirects: followAllRedirects || false, simple: simple }), (proxy.proxy && proxy.socks ? { agent: proxy.proxy } : {})), (proxy.proxy && !proxy.socks ? { proxy: "http://" + proxy.proxy + "/" } : {})), { timeout: 10000 });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request_promise_1["default"](options)];
                    case 2:
                        response_1 = _a.sent();
                        setTimeout(function () {
                            resolve(bodyOnly ? response_1.body : response_1);
                        }, this.timeout);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    TikTokScraper.prototype.returnInitError = function (error) {
        if (this.cli && !this.bulk) {
            this.spinner.stop();
        }
        if (this.event) {
            this.emit('error', error);
        }
        else {
            throw error;
        }
    };
    /**
     * Initiate scraping process
     */
    // eslint-disable-next-line consistent-return
    TikTokScraper.prototype.scrape = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2, _a, json, csv, zip;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.cli && !this.bulk) {
                            this.spinner.start();
                        }
                        if (!(this.download && !this.zip)) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.mkdir(_this.folderDestination, { recursive: true }, cb); })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        return [2 /*return*/, this.returnInitError(error_2.message)];
                    case 4:
                        if (!this.scrapeType || constant_1["default"].scrape.indexOf(this.scrapeType) === -1) {
                            return [2 /*return*/, this.returnInitError("Missing scraping type. Scrape types: " + constant_1["default"].scrape + " ")];
                        }
                        if (this.scrapeType !== 'trend' && !this.input) {
                            return [2 /*return*/, this.returnInitError('Missing input')];
                        }
                        return [4 /*yield*/, this.mainLoop()];
                    case 5:
                        _b.sent();
                        if (this.event) {
                            return [2 /*return*/, this.emit('done', 'completed')];
                        }
                        if (!this.storeHistory) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getDownloadedVideosFromHistory()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        if (!this.noWaterMark) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.withoutWatermark()];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [4 /*yield*/, this.saveCollectorData()];
                    case 10:
                        _a = _b.sent(), json = _a[0], csv = _a[1], zip = _a[2];
                        if (!this.storeHistory) return [3 /*break*/, 12];
                        // We need to make sure that we save data only about downloaded videos
                        this.collector.forEach(function (item) {
                            if (_this.store.indexOf(item.id) === -1 && item.downloaded) {
                                _this.store.push(item.id);
                            }
                        });
                        return [4 /*yield*/, this.storeDownloadProgress()];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        if (!this.webHookUrl) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.sendDataToWebHookUrl()];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14: return [2 /*return*/, __assign(__assign(__assign(__assign(__assign({ headers: this.headers, collector: this.collector }, (this.download ? { zip: zip } : {})), (this.filetype === 'all' ? { json: json, csv: csv } : {})), (this.filetype === 'json' ? { json: json } : {})), (this.filetype === 'csv' ? { csv: csv } : {})), (this.webHookUrl ? { webhook: this.httpRequests } : {}))];
                }
            });
        });
    };
    /**
     * Extract uniq video id and create the url to the video without the watermark
     */
    TikTokScraper.prototype.withoutWatermark = function () {
        var _this = this;
        return new Promise(function (resolve) {
            async_1.forEachLimit(_this.collector, 5, function (item) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 3, , 4]);
                            _a = item;
                            return [4 /*yield*/, this.extractVideoId(item)];
                        case 1:
                            _a.videoApiUrlNoWaterMark = _d.sent();
                            _b = item;
                            return [4 /*yield*/, this.getUrlWithoutTheWatermark(item.videoApiUrlNoWaterMark)];
                        case 2:
                            _b.videoUrlNoWaterMark = _d.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _c = _d.sent();
                            throw new Error("Can't extract unique video id");
                        case 4: return [2 /*return*/];
                    }
                });
            }); }, function () {
                resolve(null);
            });
        });
    };
    /**
     * Extract uniq video id
     * All videos after July 27 2020 do not store unique video id
     * it means that we can't extract url to the video without the watermark
     * @param uri
     */
    // eslint-disable-next-line class-methods-use-this
    TikTokScraper.prototype.extractVideoId = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var result, position, id, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (item.createTime > 1595808000) {
                            return [2 /*return*/, ''];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request_promise_1["default"]({
                                uri: item.videoUrl,
                                headers: this.headers
                            })];
                    case 2:
                        result = _b.sent();
                        position = Buffer.from(result).indexOf('vid:');
                        if (position !== -1) {
                            id = Buffer.from(result)
                                .slice(position + 4, position + 36)
                                .toString();
                            return [2 /*return*/, "https://api2-16-h2.musical.ly/aweme/v1/play/?video_id=" + id + "&vr_type=0&is_play_url=1&source=PackSourceEnum_PUBLISH&media_type=4" + (this.hdVideo ? "&ratio=default&improve_bitrate=1" : '')];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, ''];
                }
            });
        });
    };
    /**
     * Get temporary url to the video without the watermark
     * The url has expiration time (between 5-20 minutes+-)
     * @param uri
     */
    TikTokScraper.prototype.getUrlWithoutTheWatermark = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var options, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uri) {
                            return [2 /*return*/, ''];
                        }
                        options = {
                            uri: uri,
                            method: 'GET',
                            headers: {
                                'user-agent': 'com.zhiliaoapp.musically/2021600040 (Linux; U; Android 5.0; en_US; SM-N900T; Build/LRX21V; Cronet/TTNetVersion:6c7b701a 2020-04-23 QuicVersion:0144d358 2020-03-24)',
                                'sec-fetch-mode': 'navigate'
                            },
                            followAllRedirects: true,
                            simple: false
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request(options, false)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.request.uri.href];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Can't extract video url without the watermark");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Main loop that collects all required metadata from the tiktok web api
     */
    TikTokScraper.prototype.mainLoop = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var taskArray = Array.from({ length: 1000 }, function (v, k) { return k + 1; });
            async_1.forEachLimit(taskArray, _this.asyncScraping(), function (item, cb) {
                switch (_this.scrapeType) {
                    case 'user':
                        _this.getUserId()
                            .then(function (query) { return _this.submitScrapingRequest(__assign(__assign({}, query), { cursor: _this.maxCursor }), true); })
                            .then(function () { return cb(null); })["catch"](function (error) { return cb(error); });
                        break;
                    case 'hashtag':
                        _this.getHashTagId()
                            .then(function (query) { return _this.submitScrapingRequest(__assign(__assign({}, query), { cursor: item === 1 ? 0 : (item - 1) * query.count }), true); })
                            .then(function () { return cb(null); })["catch"](function (error) { return cb(error); });
                        break;
                    case 'trend':
                        _this.getTrendingFeedQuery()
                            .then(function (query) { return _this.submitScrapingRequest(__assign({}, query), true); })
                            .then(function () { return cb(null); })["catch"](function (error) { return cb(error); });
                        break;
                    case 'music':
                        _this.getMusicFeedQuery()
                            .then(function (query) { return _this.submitScrapingRequest(__assign(__assign({}, query), { cursor: item === 1 ? 0 : (item - 1) * query.count }), true); })
                            .then(function () { return cb(null); })["catch"](function (error) { return cb(error); });
                        break;
                    default:
                        break;
                }
            }, function () {
                resolve(null);
            });
        });
    };
    /**
     * Submit request to the TikTok web API
     * Collect received metadata
     */
    TikTokScraper.prototype.submitScrapingRequest = function (query, updatedApiResponse) {
        if (updatedApiResponse === void 0) { updatedApiResponse = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result, hasMore, maxCursor, cursor, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.scrapeData(query)];
                    case 1:
                        result = _a.sent();
                        if (result.statusCode !== 0) {
                            throw new Error("Can't scrape more posts");
                        }
                        hasMore = result.hasMore, maxCursor = result.maxCursor, cursor = result.cursor;
                        if ((updatedApiResponse && !result.itemList) || (!updatedApiResponse && !result.items)) {
                            throw new Error('No more posts');
                        }
                        return [4 /*yield*/, this.collectPosts(updatedApiResponse ? result.itemList : result.items)];
                    case 2:
                        _a.sent();
                        if (!hasMore) {
                            throw new Error('No more posts');
                        }
                        if (this.collector.length >= this.number && this.number !== 0) {
                            throw new Error('Done');
                        }
                        this.maxCursor = parseInt(maxCursor === undefined ? cursor : maxCursor, 10);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3.message;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Store collector data in the CSV and/or JSON files
     */
    TikTokScraper.prototype.saveCollectorData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json, csv, zip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.download) return [3 /*break*/, 2];
                        if (this.cli) {
                            this.spinner.stop();
                        }
                        if (!(this.collector.length && !this.test)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Downloader.downloadPosts({
                                zip: this.zip,
                                folder: this.folderDestination,
                                collector: this.collector,
                                fileName: this.fileDestination,
                                asyncDownload: this.asyncDownload
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        json = '';
                        csv = '';
                        zip = '';
                        if (!this.collector.length) return [3 /*break*/, 4];
                        json = this.fileDestination + ".json";
                        csv = this.fileDestination + ".csv";
                        zip = this.zip ? this.fileDestination + ".zip" : this.folderDestination;
                        return [4 /*yield*/, this.saveMetadata({ json: json, csv: csv })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (this.cli) {
                            this.spinner.stop();
                        }
                        return [2 /*return*/, [json, csv, zip]];
                }
            });
        });
    };
    /**
     * Save post metadata
     * @param param0
     */
    TikTokScraper.prototype.saveMetadata = function (_a) {
        var json = _a.json, csv = _a.csv;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, _d, _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!this.collector.length) return [3 /*break*/, 10];
                        _b = this.filetype;
                        switch (_b) {
                            case 'json': return [3 /*break*/, 1];
                            case 'csv': return [3 /*break*/, 3];
                            case 'all': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.writeFile(json, JSON.stringify(_this.collector), cb); })];
                    case 2:
                        _f.sent();
                        return [3 /*break*/, 10];
                    case 3: return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.writeFile(csv, _this.json2csvParser.parse(_this.collector), cb); })];
                    case 4:
                        _f.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        _d = (_c = Promise).all;
                        return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.writeFile(json, JSON.stringify(_this.collector), cb); })];
                    case 6:
                        _e = [
                            _f.sent()
                        ];
                        return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.writeFile(csv, _this.json2csvParser.parse(_this.collector), cb); })];
                    case 7: return [4 /*yield*/, _d.apply(_c, [_e.concat([
                                _f.sent()
                            ])])];
                    case 8:
                        _f.sent();
                        return [3 /*break*/, 10];
                    case 9: return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * If option -s is being used then we need to
     * retrieve already downloaded video id's to prevent them to be downloaded again
     */
    TikTokScraper.prototype.getDownloadedVideosFromHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var readFromStore, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, bluebird_1.fromCallback(function (cb) {
                                return fs_1.readFile(_this.historyPath + "/" + _this.storeValue + ".json", { encoding: 'utf-8' }, cb);
                            })];
                    case 1:
                        readFromStore = (_b.sent());
                        this.store = JSON.parse(readFromStore);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        this.collector = this.collector.map(function (item) {
                            if (_this.store.indexOf(item.id) !== -1) {
                                item.repeated = true;
                            }
                            return item;
                        });
                        this.collector = this.collector.filter(function (item) { return !item.repeated; });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Store progress to avoid downloading duplicates
     * Only available from the CLI
     */
    TikTokScraper.prototype.storeDownloadProgress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var historyType, totalNewDownloadedVideos, history_1, readFromStore, error_4, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        historyType = this.scrapeType === 'trend' ? 'trend' : this.scrapeType + "_" + this.input;
                        totalNewDownloadedVideos = this.collector.filter(function (item) { return item.downloaded; }).length;
                        if (!(this.storeValue && totalNewDownloadedVideos)) return [3 /*break*/, 11];
                        history_1 = {};
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, bluebird_1.fromCallback(function (cb) {
                                return fs_1.readFile(_this.historyPath + "/tiktok_history.json", { encoding: 'utf-8' }, cb);
                            })];
                    case 2:
                        readFromStore = (_c.sent());
                        history_1 = JSON.parse(readFromStore);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _c.sent();
                        history_1[historyType] = {
                            type: this.scrapeType,
                            input: this.input,
                            downloaded_posts: 0,
                            last_change: new Date(),
                            file_location: this.historyPath + "/" + this.storeValue + ".json"
                        };
                        return [3 /*break*/, 4];
                    case 4:
                        if (!history_1[historyType]) {
                            history_1[historyType] = {
                                type: this.scrapeType,
                                input: this.input,
                                downloaded_posts: 0,
                                last_change: new Date(),
                                file_location: this.historyPath + "/" + this.storeValue + ".json"
                            };
                        }
                        history_1[historyType] = {
                            type: this.scrapeType,
                            input: this.input,
                            downloaded_posts: history_1[historyType].downloaded_posts + totalNewDownloadedVideos,
                            last_change: new Date(),
                            file_location: this.historyPath + "/" + this.storeValue + ".json"
                        };
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.writeFile(_this.historyPath + "/" + _this.storeValue + ".json", JSON.stringify(_this.store), cb); })];
                    case 6:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _a = _c.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.writeFile(_this.historyPath + "/tiktok_history.json", JSON.stringify(history_1), cb); })];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        _b = _c.sent();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Collect post data from the API response
     * @param posts
     */
    TikTokScraper.prototype.collectPosts = function (posts) {
        for (var i = 0; i < posts.length; i += 1) {
            if (this.number) {
                if (this.collector.length >= this.number) {
                    break;
                }
            }
            if (this.noDuplicates.indexOf(posts[i].id) === -1) {
                this.noDuplicates.push(posts[i].id);
                var item = __assign(__assign({ id: posts[i].id, secretID: posts[i].video.id, text: posts[i].desc, createTime: posts[i].createTime, authorMeta: {
                        id: posts[i].author.id,
                        secUid: posts[i].author.secUid,
                        name: posts[i].author.uniqueId,
                        nickName: posts[i].author.nickname,
                        verified: posts[i].author.verified,
                        signature: posts[i].author.signature,
                        avatar: posts[i].author.avatarLarger,
                        following: posts[i].authorStats.followingCount,
                        fans: posts[i].authorStats.followerCount,
                        heart: posts[i].authorStats.heartCount,
                        video: posts[i].authorStats.videoCount,
                        digg: posts[i].authorStats.diggCount
                    } }, (posts[i].music
                    ? {
                        musicMeta: {
                            musicId: posts[i].music.id,
                            musicName: posts[i].music.title,
                            musicAuthor: posts[i].music.authorName,
                            musicOriginal: posts[i].music.original,
                            musicAlbum: posts[i].music.album,
                            playUrl: posts[i].music.playUrl,
                            coverThumb: posts[i].music.coverThumb,
                            coverMedium: posts[i].music.coverMedium,
                            coverLarge: posts[i].music.coverLarge,
                            duration: posts[i].music.duration
                        }
                    }
                    : {})), { covers: {
                        "default": posts[i].video.cover,
                        origin: posts[i].video.originCover,
                        dynamic: posts[i].video.dynamicCover
                    }, webVideoUrl: "https://www.tiktok.com/@" + posts[i].author.uniqueId + "/video/" + posts[i].id, videoUrl: posts[i].video.downloadAddr, videoUrlNoWaterMark: '', videoApiUrlNoWaterMark: '', videoMeta: {
                        height: posts[i].video.height,
                        width: posts[i].video.width,
                        duration: posts[i].video.duration
                    }, diggCount: posts[i].stats.diggCount, shareCount: posts[i].stats.shareCount, playCount: posts[i].stats.playCount, commentCount: posts[i].stats.commentCount, downloaded: false, mentions: posts[i].desc.match(/(@\w+)/g) || [], hashtags: posts[i].challenges
                        ? posts[i].challenges.map(function (_a) {
                            var id = _a.id, title = _a.title, desc = _a.desc, coverLarger = _a.coverLarger;
                            return ({
                                id: id,
                                name: title,
                                title: desc,
                                cover: coverLarger
                            });
                        })
                        : [] });
                if (this.event) {
                    this.emit('data', item);
                    this.collector.push({});
                }
                else {
                    this.collector.push(item);
                }
            }
        }
    };
    TikTokScraper.prototype.scrapeData = function (qs) {
        return __awaiter(this, void 0, void 0, function () {
            var options, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.storeValue = this.scrapeType === 'trend' ? 'trend' : qs.id || qs.challengeID || qs.musicID;
                        options = {
                            uri: this.getApiEndpoint,
                            method: 'GET',
                            qs: __assign({}, qs),
                            headers: {
                                cookie: this.getCookies(true)
                            },
                            json: true
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request(options)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        error_5 = _a.sent();
                        throw error_5.message;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get trending feed query
     */
    // eslint-disable-next-line class-methods-use-this
    TikTokScraper.prototype.getTrendingFeedQuery = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        aid: 1988,
                        lang: '',
                        count: 30,
                        verifyFp: this.verifyFp,
                        user_agent: this.headers['user-agent']
                    }];
            });
        });
    };
    /**
     * Get music feed query
     */
    TikTokScraper.prototype.getMusicFeedQuery = function () {
        return __awaiter(this, void 0, void 0, function () {
            var musicIdRegex;
            return __generator(this, function (_a) {
                musicIdRegex = /.com\/music\/[\w+-]+-(\d{15,22})/.exec(this.input);
                if (musicIdRegex) {
                    this.input = musicIdRegex[1];
                }
                return [2 /*return*/, {
                        musicID: this.input,
                        lang: '',
                        aid: 1988,
                        count: 30,
                        cursor: 0,
                        verifyFp: '',
                        user_agent: this.headers['user-agent']
                    }];
            });
        });
    };
    /**
     * Get hashtag ID
     */
    TikTokScraper.prototype.getHashTagId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, query, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.idStore) {
                            return [2 /*return*/, {
                                    challengeID: this.idStore,
                                    count: 30,
                                    cursor: 0,
                                    aid: 1988,
                                    verifyFp: this.verifyFp,
                                    user_agent: this.headers['user-agent']
                                }];
                        }
                        id = encodeURIComponent(this.input);
                        query = {
                            uri: this.mainHost + "node/share/tag/" + id + "?uniqueId=" + id,
                            qs: {
                                user_agent: this.headers['user-agent']
                            },
                            method: 'GET',
                            json: true
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request(query)];
                    case 2:
                        response = _a.sent();
                        if (response.statusCode !== 0) {
                            throw new Error("Can not find the hashtag: " + this.input);
                        }
                        this.idStore = response.challengeInfo.challenge.id;
                        return [2 /*return*/, {
                                challengeID: this.idStore,
                                count: 30,
                                cursor: 0,
                                aid: 1988,
                                verifyFp: this.verifyFp,
                                user_agent: this.headers['user-agent']
                            }];
                    case 3:
                        error_6 = _a.sent();
                        throw error_6.message;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TikTokScraper.prototype.getCookies = function (auth) {
        if (auth === void 0) { auth = false; }
        var session = auth ? this.sessionList[Math.floor(Math.random() * this.sessionList.length)] : '';
        return this.headers.cookie + ";" + (session || '');
    };
    /**
     * Get user ID
     */
    TikTokScraper.prototype.getUserId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.byUserId || this.idStore) {
                            return [2 /*return*/, {
                                    id: this.userIdStore,
                                    secUid: this.idStore ? this.idStore : this.input,
                                    lang: '',
                                    aid: 1988,
                                    sourceType: constant_1["default"].sourceType.user,
                                    count: 30,
                                    cursor: 0,
                                    verifyFp: this.verifyFp
                                }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getUserProfileInfo()];
                    case 2:
                        response = _a.sent();
                        this.idStore = response.user.secUid;
                        this.userIdStore = response.user.id;
                        return [2 /*return*/, {
                                id: this.userIdStore,
                                aid: 1988,
                                secUid: this.idStore,
                                sourceType: constant_1["default"].sourceType.user,
                                count: 30,
                                lang: '',
                                cursor: 0,
                                verifyFp: this.verifyFp
                            }];
                    case 3:
                        error_7 = _a.sent();
                        throw error_7.message;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get user profile information
     * @param {} username
     */
    TikTokScraper.prototype.getUserProfileInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, response, breakResponse, userMetadata, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.input) {
                            throw "Username is missing";
                        }
                        options = {
                            method: 'GET',
                            uri: "https://www.tiktok.com/@" + this.input,
                            json: true,
                            headers: {
                                cookie: this.getCookies(true)
                            }
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request(options)];
                    case 2:
                        response = _b.sent();
                        breakResponse = response
                            .split("<script id=\"__NEXT_DATA__\" type=\"application/json\" crossorigin=\"anonymous\">")[1]
                            .split("</script>")[0];
                        if (breakResponse) {
                            userMetadata = JSON.parse(breakResponse);
                            return [2 /*return*/, userMetadata.props.pageProps.userInfo];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: throw new Error("Can't extract user metadata from the html page. Make sure that user does exist and try to use proxy");
                }
            });
        });
    };
    /**
     * Get hashtag information
     * @param {} hashtag
     */
    TikTokScraper.prototype.getHashtagInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.input) {
                            throw "Hashtag is missing";
                        }
                        query = {
                            uri: this.mainHost + "node/share/tag/" + this.input + "?uniqueId=" + this.input,
                            qs: {
                                user_agent: this.headers['user-agent'],
                                screen_width: 1792,
                                screen_height: 1120,
                                browser_language: 'en-US',
                                browser_platform: 'MacIntel',
                                appId: 1233,
                                isIOS: false,
                                isMobile: false,
                                isAndroid: false,
                                appType: 'm',
                                browser_online: true,
                                browser_version: '5.0 (Macintosh)',
                                browser_name: 'Mozilla'
                            },
                            method: 'GET',
                            json: true
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request(query)];
                    case 2:
                        response = _a.sent();
                        if (!response) {
                            throw new Error("Can't find hashtag: " + this.input);
                        }
                        if (response.statusCode !== 0) {
                            throw new Error("Can't find hashtag: " + this.input);
                        }
                        return [2 /*return*/, response.challengeInfo];
                    case 3:
                        error_8 = _a.sent();
                        throw error_8.message;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get music information
     * @param {} music link
     */
    TikTokScraper.prototype.getMusicInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var musicId, query, response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.input) {
                            throw "Music is missing";
                        }
                        musicId = /music\/([\w-]+)/.exec(this.input);
                        this.input = musicId ? musicId[1] : "-" + this.input;
                        query = {
                            uri: this.mainHost + "node/share/music/" + this.input,
                            qs: {
                                user_agent: this.headers['user-agent'],
                                screen_width: 1792,
                                screen_height: 1120,
                                browser_language: 'en-US',
                                browser_platform: 'MacIntel',
                                appId: 1233,
                                isIOS: false,
                                isMobile: false,
                                isAndroid: false,
                                appType: 'm',
                                aid: 1988,
                                app_name: 'tiktok_web',
                                device_platform: 'web'
                            },
                            method: 'GET',
                            json: true
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request(query)];
                    case 2:
                        response = _a.sent();
                        if (response.statusCode !== 0) {
                            throw new Error("Can't find music data: " + this.input);
                        }
                        return [2 /*return*/, response.musicInfo];
                    case 3:
                        error_9 = _a.sent();
                        throw error_9.message;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sign URL
     * @param {}
     */
    TikTokScraper.prototype.signUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.input) {
                    throw "Url is missing";
                }
                return [2 /*return*/, helpers_1.sign(this.headers['user-agent'], this.input)];
            });
        });
    };
    /**
     * Get video metadata from the HTML
     * This method can be used if you aren't able to retrieve video metadata from a simple API call
     * Can be slow
     */
    TikTokScraper.prototype.getVideoMetadataFromHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, short, regex, response, videoProps, shortKey, videoData, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            uri: this.input + "?verifyFp=" + this.verifyFp,
                            method: 'GET',
                            json: true
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        short = false;
                        regex = void 0;
                        return [4 /*yield*/, this.request(options)];
                    case 2:
                        response = _a.sent();
                        if (!response) {
                            throw new Error("Can't extract video meta data");
                        }
                        if (response.indexOf('<script>window.__INIT_PROPS__ = ') > -1) {
                            short = true;
                        }
                        if (short) {
                            regex = /<script>window.__INIT_PROPS__ = ([^]*)\}<\/script>/.exec(response);
                        }
                        else {
                            regex = /<script id="__NEXT_DATA__" type="application\/json" crossorigin="anonymous">(.+)<\/script><script cros/.exec(response);
                        }
                        if (regex) {
                            videoProps = JSON.parse(short ? regex[1] + "}" : regex[1]);
                            shortKey = '/v/:id';
                            if (short) {
                                if (videoProps['/v/:id']) {
                                    if (videoProps['/v/:id'].statusCode) {
                                        throw new Error();
                                    }
                                }
                                else if (videoProps['/i18n/share/video/:id']) {
                                    shortKey = '/i18n/share/video/:id';
                                    if (videoProps['/i18n/share/video/:id'].statusCode) {
                                        throw new Error();
                                    }
                                }
                                else {
                                    throw new Error();
                                }
                            }
                            else if (videoProps.props.pageProps.statusCode) {
                                throw new Error();
                            }
                            videoData = short ? videoProps[shortKey].videoData : videoProps.props.pageProps.itemInfo.itemStruct;
                            return [2 /*return*/, videoData];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        throw "Can't extract video metadata: " + this.input;
                    case 4: throw new Error();
                }
            });
        });
    };
    /**
     * Get video metadata from the regular API endpoint
     */
    TikTokScraper.prototype.getVideoMetadata = function (url) {
        if (url === void 0) { url = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var videoData, videoUsername, videoId, options, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        videoData = /tiktok.com\/(@[\w.-]+)\/video\/(\d+)/.exec(url || this.input);
                        if (!videoData) return [3 /*break*/, 4];
                        videoUsername = videoData[1];
                        videoId = videoData[2];
                        options = {
                            method: 'GET',
                            uri: "https://www.tiktok.com/node/share/video/" + videoUsername + "/" + videoId,
                            json: true
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request(options)];
                    case 2:
                        response = _b.sent();
                        if (response.statusCode === 0) {
                            return [2 /*return*/, response.itemInfo.itemStruct];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: throw new Error("Can't extract video metadata: " + this.input);
                }
            });
        });
    };
    /**
     * Get video url without the watermark
     * @param {}
     */
    TikTokScraper.prototype.getVideoMeta = function (html) {
        if (html === void 0) { html = true; }
        return __awaiter(this, void 0, void 0, function () {
            var videoData, videoItem, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.input) {
                            throw "Url is missing";
                        }
                        videoData = {};
                        if (!html) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getVideoMetadataFromHtml()];
                    case 1:
                        videoData = _d.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getVideoMetadata()];
                    case 3:
                        videoData = _d.sent();
                        _d.label = 4;
                    case 4:
                        videoItem = {
                            id: videoData.id,
                            secretID: videoData.video.id,
                            text: videoData.desc,
                            createTime: videoData.createTime,
                            authorMeta: {
                                id: videoData.author.id,
                                secUid: videoData.author.secUid,
                                name: videoData.author.uniqueId,
                                nickName: videoData.author.nickname,
                                following: videoData.authorStats.followingCount,
                                fans: videoData.authorStats.followerCount,
                                heart: videoData.authorStats.heartCount,
                                video: videoData.authorStats.videoCount,
                                digg: videoData.authorStats.diggCount,
                                verified: videoData.author.verified,
                                private: videoData.author.secret,
                                signature: videoData.author.signature,
                                avatar: videoData.author.avatarLarger
                            },
                            musicMeta: {
                                musicId: videoData.music.id,
                                musicName: videoData.music.title,
                                musicAuthor: videoData.music.authorName,
                                musicOriginal: videoData.music.original,
                                coverThumb: videoData.music.coverThumb,
                                coverMedium: videoData.music.coverMedium,
                                coverLarge: videoData.music.coverLarge,
                                duration: videoData.music.duration
                            },
                            imageUrl: videoData.video.cover,
                            videoUrl: videoData.video.playAddr,
                            videoUrlNoWaterMark: '',
                            videoApiUrlNoWaterMark: '',
                            videoMeta: {
                                width: videoData.video.width,
                                height: videoData.video.height,
                                ratio: videoData.video.ratio,
                                duration: videoData.video.duration,
                                duetEnabled: videoData.duetEnabled,
                                stitchEnabled: videoData.stitchEnabled,
                                duetInfo: videoData.duetInfo
                            },
                            covers: {
                                "default": videoData.video.cover,
                                origin: videoData.video.originCover
                            },
                            diggCount: videoData.stats.diggCount,
                            shareCount: videoData.stats.shareCount,
                            playCount: videoData.stats.playCount,
                            commentCount: videoData.stats.commentCount,
                            downloaded: false,
                            mentions: videoData.desc.match(/(@\w+)/g) || [],
                            hashtags: videoData.challenges
                                ? videoData.challenges.map(function (_a) {
                                    var id = _a.id, title = _a.title, desc = _a.desc, profileLarger = _a.profileLarger;
                                    return ({
                                        id: id,
                                        name: title,
                                        title: desc,
                                        cover: profileLarger
                                    });
                                })
                                : []
                        };
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 9, , 10]);
                        if (!this.noWaterMark) return [3 /*break*/, 8];
                        _a = videoItem;
                        return [4 /*yield*/, this.extractVideoId(videoItem)];
                    case 6:
                        _a.videoApiUrlNoWaterMark = _d.sent();
                        _b = videoItem;
                        return [4 /*yield*/, this.getUrlWithoutTheWatermark(videoItem.videoApiUrlNoWaterMark)];
                    case 7:
                        _b.videoUrlNoWaterMark = _d.sent();
                        _d.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        _c = _d.sent();
                        return [3 /*break*/, 10];
                    case 10:
                        this.collector.push(videoItem);
                        return [2 /*return*/, videoItem];
                }
            });
        });
    };
    /**
     * If webhook url was provided then send POST/GET request to the URL with the data from the this.collector
     */
    TikTokScraper.prototype.sendDataToWebHookUrl = function () {
        var _this = this;
        return new Promise(function (resolve) {
            async_1.forEachLimit(_this.collector, 3, function (item, cb) {
                request_promise_1["default"](__assign(__assign(__assign({ uri: _this.webHookUrl, method: _this.method, headers: {
                        'user-agent': 'TikTok-Scraper'
                    } }, (_this.method === 'POST' ? { body: item } : {})), (_this.method === 'GET' ? { qs: { json: encodeURIComponent(JSON.stringify(item)) } } : {})), { json: true }))
                    .then(function () {
                    _this.httpRequests.good += 1;
                })["catch"](function () {
                    _this.httpRequests.bad += 1;
                })["finally"](function () { return cb(null); });
            }, function () {
                resolve(null);
            });
        });
    };
    return TikTokScraper;
}(events_1.EventEmitter));
exports.TikTokScraper = TikTokScraper;
