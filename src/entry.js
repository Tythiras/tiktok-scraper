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
exports.fromfile = exports.history = exports.video = exports.getVideoMeta = exports.signUrl = exports.getUserProfileInfo = exports.getMusicInfo = exports.getHashtagInfo = exports.trendEvent = exports.musicEvent = exports.userEvent = exports.hashtagEvent = exports.music = exports.trend = exports.user = exports.hashtag = void 0;
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
/* eslint-disable no-restricted-syntax */
var os_1 = require("os");
var fs_1 = require("fs");
var bluebird_1 = require("bluebird");
var async_1 = require("async");
var core_1 = require("./core");
var constant_1 = require("./constant");
var helpers_1 = require("./helpers");
var getInitOptions = function () {
    return {
        number: 30,
        download: false,
        zip: false,
        asyncDownload: 5,
        asyncScraping: 3,
        proxy: '',
        filepath: '',
        filetype: 'na',
        progress: false,
        event: false,
        by_user_id: false,
        noWaterMark: false,
        hdVideo: false,
        timeout: 0,
        tac: '',
        signature: '',
        verifyFp: constant_1["default"].verifyFp(),
        headers: {
            'user-agent': constant_1["default"].userAgent(),
            referer: 'https://www.tiktok.com/',
            cookie: "tt_webid_v2=68" + helpers_1.makeid(16)
        }
    };
};
/**
 * Load proxys from a file
 * @param file
 */
var proxyFromFile = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var data, proxyList, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.readFile(file, { encoding: 'utf-8' }, cb); })];
            case 1:
                data = (_a.sent());
                proxyList = data.split('\n');
                if (!proxyList.length) {
                    throw new Error('Proxy file is empty');
                }
                return [2 /*return*/, proxyList];
            case 2:
                error_1 = _a.sent();
                throw error_1.message;
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Load session list from a file
 * @param file
 */
var sessionFromFile = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var data, proxyList, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.readFile(file, { encoding: 'utf-8' }, cb); })];
            case 1:
                data = (_a.sent());
                proxyList = data.split('\n');
                if (!proxyList.length || proxyList[0] === '') {
                    throw new Error('Session file is empty');
                }
                return [2 /*return*/, proxyList];
            case 2:
                error_2 = _a.sent();
                throw error_2.message;
            case 3: return [2 /*return*/];
        }
    });
}); };
var promiseScraper = function (input, type, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, constructor, scraper, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (options && typeof options !== 'object') {
                        throw new TypeError('Object is expected');
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.proxyFile)) return [3 /*break*/, 2];
                    _a = options;
                    return [4 /*yield*/, proxyFromFile(options === null || options === void 0 ? void 0 : options.proxyFile)];
                case 1:
                    _a.proxy = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(options === null || options === void 0 ? void 0 : options.sessionFile)) return [3 /*break*/, 4];
                    _b = options;
                    return [4 /*yield*/, sessionFromFile(options === null || options === void 0 ? void 0 : options.sessionFile)];
                case 3:
                    _b.sessionList = _c.sent();
                    _c.label = 4;
                case 4:
                    constructor = __assign(__assign(__assign({}, getInitOptions()), options), { type: type, input: input });
                    scraper = new core_1.TikTokScraper(constructor);
                    return [4 /*yield*/, scraper.scrape()];
                case 5:
                    result = _c.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
var eventScraper = function (input, type, options) {
    if (options === void 0) { options = {}; }
    if (options && typeof options !== 'object') {
        throw new TypeError('Object is expected');
    }
    var contructor = __assign(__assign(__assign({}, getInitOptions()), options), { type: type, input: input, event: true });
    return new core_1.TikTokScraper(contructor);
};
var hashtag = function (input, options) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, promiseScraper(input, 'hashtag', options)];
}); }); };
exports.hashtag = hashtag;
var user = function (input, options) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, promiseScraper(input, 'user', options)];
}); }); };
exports.user = user;
var trend = function (input, options) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, promiseScraper(input, 'trend', options)];
}); }); };
exports.trend = trend;
var music = function (input, options) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, promiseScraper(input, 'music', options)];
}); }); };
exports.music = music;
var hashtagEvent = function (input, options) { return eventScraper(input, 'hashtag', options); };
exports.hashtagEvent = hashtagEvent;
var userEvent = function (input, options) { return eventScraper(input, 'user', options); };
exports.userEvent = userEvent;
var musicEvent = function (input, options) { return eventScraper(input, 'music', options); };
exports.musicEvent = musicEvent;
var trendEvent = function (input, options) { return eventScraper(input, 'trend', options); };
exports.trendEvent = trendEvent;
var getHashtagInfo = function (input, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, contructor, scraper, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (options && typeof options !== 'object') {
                        throw new TypeError('Object is expected');
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.proxyFile)) return [3 /*break*/, 2];
                    _a = options;
                    return [4 /*yield*/, proxyFromFile(options === null || options === void 0 ? void 0 : options.proxyFile)];
                case 1:
                    _a.proxy = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(options === null || options === void 0 ? void 0 : options.sessionFile)) return [3 /*break*/, 4];
                    _b = options;
                    return [4 /*yield*/, sessionFromFile(options === null || options === void 0 ? void 0 : options.sessionFile)];
                case 3:
                    _b.sessionList = _c.sent();
                    _c.label = 4;
                case 4:
                    contructor = __assign(__assign(__assign({}, getInitOptions()), options), { type: 'signle_hashtag', input: input });
                    scraper = new core_1.TikTokScraper(contructor);
                    return [4 /*yield*/, scraper.getHashtagInfo()];
                case 5:
                    result = _c.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
exports.getHashtagInfo = getHashtagInfo;
var getMusicInfo = function (input, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, contructor, scraper, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (options && typeof options !== 'object') {
                        throw new TypeError('Object is expected');
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.proxyFile)) return [3 /*break*/, 2];
                    _a = options;
                    return [4 /*yield*/, proxyFromFile(options === null || options === void 0 ? void 0 : options.proxyFile)];
                case 1:
                    _a.proxy = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(options === null || options === void 0 ? void 0 : options.sessionFile)) return [3 /*break*/, 4];
                    _b = options;
                    return [4 /*yield*/, sessionFromFile(options === null || options === void 0 ? void 0 : options.sessionFile)];
                case 3:
                    _b.sessionList = _c.sent();
                    _c.label = 4;
                case 4:
                    contructor = __assign(__assign(__assign({}, getInitOptions()), options), { type: 'single_music', input: input });
                    scraper = new core_1.TikTokScraper(contructor);
                    return [4 /*yield*/, scraper.getMusicInfo()];
                case 5:
                    result = _c.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
exports.getMusicInfo = getMusicInfo;
var getUserProfileInfo = function (input, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, contructor, scraper, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (options && typeof options !== 'object') {
                        throw new TypeError('Object is expected');
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.proxyFile)) return [3 /*break*/, 2];
                    _a = options;
                    return [4 /*yield*/, proxyFromFile(options === null || options === void 0 ? void 0 : options.proxyFile)];
                case 1:
                    _a.proxy = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(options === null || options === void 0 ? void 0 : options.sessionFile)) return [3 /*break*/, 4];
                    _b = options;
                    return [4 /*yield*/, sessionFromFile(options === null || options === void 0 ? void 0 : options.sessionFile)];
                case 3:
                    _b.sessionList = _c.sent();
                    _c.label = 4;
                case 4:
                    contructor = __assign(__assign(__assign({}, getInitOptions()), options), { type: 'sinsgle_user', input: input });
                    scraper = new core_1.TikTokScraper(contructor);
                    return [4 /*yield*/, scraper.getUserProfileInfo()];
                case 5:
                    result = _c.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
exports.getUserProfileInfo = getUserProfileInfo;
var signUrl = function (input, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, contructor, scraper, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (options && typeof options !== 'object') {
                        throw new TypeError('Object is expected');
                    }
                    if (!options.proxyFile) return [3 /*break*/, 2];
                    _a = options;
                    return [4 /*yield*/, proxyFromFile(options === null || options === void 0 ? void 0 : options.proxyFile)];
                case 1:
                    _a.proxy = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(options === null || options === void 0 ? void 0 : options.sessionFile)) return [3 /*break*/, 4];
                    _b = options;
                    return [4 /*yield*/, sessionFromFile(options === null || options === void 0 ? void 0 : options.sessionFile)];
                case 3:
                    _b.sessionList = _c.sent();
                    _c.label = 4;
                case 4:
                    contructor = __assign(__assign(__assign({}, getInitOptions()), options), { type: 'signature', input: input });
                    scraper = new core_1.TikTokScraper(contructor);
                    return [4 /*yield*/, scraper.signUrl()];
                case 5:
                    result = _c.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
exports.signUrl = signUrl;
var getVideoMeta = function (input, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, contructor, scraper, fullUrl, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (options && typeof options !== 'object') {
                        throw new TypeError('Object is expected');
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.proxyFile)) return [3 /*break*/, 2];
                    _a = options;
                    return [4 /*yield*/, proxyFromFile(options === null || options === void 0 ? void 0 : options.proxyFile)];
                case 1:
                    _a.proxy = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(options === null || options === void 0 ? void 0 : options.sessionFile)) return [3 /*break*/, 4];
                    _b = options;
                    return [4 /*yield*/, sessionFromFile(options === null || options === void 0 ? void 0 : options.sessionFile)];
                case 3:
                    _b.sessionList = _c.sent();
                    _c.label = 4;
                case 4:
                    contructor = __assign(__assign(__assign({}, getInitOptions()), options), { type: 'video_meta', input: input });
                    scraper = new core_1.TikTokScraper(contructor);
                    fullUrl = /^https:\/\/www\.tiktok\.com\/@[\w.-]+\/video\/\d+/.test(input);
                    return [4 /*yield*/, scraper.getVideoMeta(!fullUrl)];
                case 5:
                    result = _c.sent();
                    return [2 /*return*/, {
                            headers: contructor.headers,
                            collector: [result]
                        }];
            }
        });
    });
};
exports.getVideoMeta = getVideoMeta;
var video = function (input, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, contructor, scraper, result, path, outputMessage, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (options && typeof options !== 'object') {
                        throw new TypeError('Object is expected');
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.proxyFile)) return [3 /*break*/, 2];
                    _a = options;
                    return [4 /*yield*/, proxyFromFile(options === null || options === void 0 ? void 0 : options.proxyFile)];
                case 1:
                    _a.proxy = _d.sent();
                    _d.label = 2;
                case 2:
                    if (!(options === null || options === void 0 ? void 0 : options.sessionFile)) return [3 /*break*/, 4];
                    _b = options;
                    return [4 /*yield*/, sessionFromFile(options === null || options === void 0 ? void 0 : options.sessionFile)];
                case 3:
                    _b.sessionList = _d.sent();
                    _d.label = 4;
                case 4:
                    contructor = __assign(__assign(__assign({}, getInitOptions()), options), { type: 'video', input: input });
                    scraper = new core_1.TikTokScraper(contructor);
                    return [4 /*yield*/, scraper.getVideoMeta()];
                case 5:
                    result = _d.sent();
                    path = (options === null || options === void 0 ? void 0 : options.filepath) ? (options === null || options === void 0 ? void 0 : options.filepath) + "/" + result.id : result.id;
                    outputMessage = {};
                    if (!(options === null || options === void 0 ? void 0 : options.download)) return [3 /*break*/, 9];
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, scraper.Downloader.downloadSingleVideo(result)];
                case 7:
                    _d.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _c = _d.sent();
                    throw new Error('Unable to download the video');
                case 9:
                    if (!(options === null || options === void 0 ? void 0 : options.filetype)) return [3 /*break*/, 11];
                    return [4 /*yield*/, scraper.saveMetadata({ json: path + ".json", csv: path + ".csv" })];
                case 10:
                    _d.sent();
                    outputMessage = __assign(__assign(__assign({}, ((options === null || options === void 0 ? void 0 : options.filetype) === 'all' ? { json: path + ".json", csv: path + ".csv" } : {})), ((options === null || options === void 0 ? void 0 : options.filetype) === 'json' ? { json: path + ".json" } : {})), ((options === null || options === void 0 ? void 0 : options.filetype) === 'csv' ? { csv: path + ".csv" } : {}));
                    _d.label = 11;
                case 11: return [2 /*return*/, __assign(__assign({}, ((options === null || options === void 0 ? void 0 : options.download) ? { message: "Video location: " + contructor.filepath + "/" + result.id + ".mp4" } : {})), outputMessage)];
            }
        });
    });
};
exports.video = video;
// eslint-disable-next-line no-unused-vars
var history = function (input, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var store, historyPath, error_3, historyStore, split, type, remove, _loop_1, _i, _a, key_1, key, historyFile_1, table, _b, _c, key;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    historyPath = process.env.SCRAPING_FROM_DOCKER ? '/usr/app/files' : (options === null || options === void 0 ? void 0 : options.historyPath) || os_1.tmpdir();
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.readFile(historyPath + "/tiktok_history.json", { encoding: 'utf-8' }, cb); })];
                case 2:
                    store = (_d.sent());
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _d.sent();
                    throw "History file doesn't exist";
                case 4:
                    historyStore = JSON.parse(store);
                    if (!(options === null || options === void 0 ? void 0 : options.remove)) return [3 /*break*/, 10];
                    split = options.remove.split(':');
                    type = split[0];
                    if (!(type === 'all')) return [3 /*break*/, 6];
                    remove = [];
                    _loop_1 = function (key_1) {
                        remove.push(bluebird_1.fromCallback(function (cb) { return fs_1.unlink(historyStore[key_1].file_location, cb); }));
                    };
                    for (_i = 0, _a = Object.keys(historyStore); _i < _a.length; _i++) {
                        key_1 = _a[_i];
                        _loop_1(key_1);
                    }
                    remove.push(bluebird_1.fromCallback(function (cb) { return fs_1.unlink(historyPath + "/tiktok_history.json", cb); }));
                    return [4 /*yield*/, Promise.all(remove)];
                case 5:
                    _d.sent();
                    return [2 /*return*/, { message: "History was completely removed" }];
                case 6:
                    key = type !== 'trend' ? options.remove.replace(':', '_') : 'trend';
                    if (!historyStore[key]) return [3 /*break*/, 9];
                    historyFile_1 = historyStore[key].file_location;
                    return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.unlink(historyFile_1, cb); })];
                case 7:
                    _d.sent();
                    delete historyStore[key];
                    return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.writeFile(historyPath + "/tiktok_history.json", JSON.stringify(historyStore), cb); })];
                case 8:
                    _d.sent();
                    return [2 /*return*/, { message: "Record " + key + " was removed" }];
                case 9: throw "Can't find record: " + key.split('_').join(' ');
                case 10:
                    table = [];
                    for (_b = 0, _c = Object.keys(historyStore); _b < _c.length; _b++) {
                        key = _c[_b];
                        table.push(historyStore[key]);
                    }
                    return [2 /*return*/, { table: table }];
            }
        });
    });
};
exports.history = history;
var batchProcessor = function (batch, options) {
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve) {
        console.log('TikTok Bulk Scraping Started');
        var result = [];
        async_1.forEachLimit(batch, options.asyncBulk || 5, function (item) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, output, error_4, output, error_5, error_6, output, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = item.type;
                        switch (_a) {
                            case 'user': return [3 /*break*/, 1];
                            case 'hashtag': return [3 /*break*/, 5];
                            case 'video': return [3 /*break*/, 9];
                            case 'music': return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 17];
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, exports.user(item.input, __assign({ bulk: true }, options))];
                    case 2:
                        output = _b.sent();
                        result.push({ type: item.type, input: item.input, completed: true, scraped: output.collector.length });
                        console.log("Scraping completed: " + item.type + " " + item.input);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        result.push({ type: item.type, input: item.input, completed: false });
                        console.log("Error while scraping: " + item.input);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 18];
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, exports.hashtag(item.input, __assign({ bulk: true }, options))];
                    case 6:
                        output = _b.sent();
                        result.push({ type: item.type, input: item.input, completed: true, scraped: output.collector.length });
                        console.log("Scraping completed: " + item.type + " " + item.input);
                        return [3 /*break*/, 8];
                    case 7:
                        error_5 = _b.sent();
                        result.push({ type: item.type, input: item.input, completed: false });
                        console.log("Error while scraping: " + item.input);
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 18];
                    case 9:
                        _b.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, exports.video(item.input, options)];
                    case 10:
                        _b.sent();
                        result.push({ type: item.type, input: item.input, completed: true });
                        console.log("Scraping completed: " + item.type + " " + item.input);
                        return [3 /*break*/, 12];
                    case 11:
                        error_6 = _b.sent();
                        result.push({ type: item.type, input: item.input, completed: false });
                        console.log("Error while scraping: " + item.input);
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 18];
                    case 13:
                        _b.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, exports.music(item.input, __assign({ bulk: true }, options))];
                    case 14:
                        output = _b.sent();
                        result.push({ type: item.type, input: item.input, completed: true, scraped: output.collector.length });
                        console.log("Scraping completed: " + item.type + " " + item.input);
                        return [3 /*break*/, 16];
                    case 15:
                        error_7 = _b.sent();
                        result.push({ type: item.type, input: item.input, completed: false });
                        console.log("Error while scraping: " + item.input);
                        return [3 /*break*/, 16];
                    case 16: return [3 /*break*/, 18];
                    case 17: return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                }
            });
        }); }, function () {
            resolve(result);
        });
    });
};
var fromfile = function (input, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var inputFile, error_8, batch, _a, _b, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bluebird_1.fromCallback(function (cb) { return fs_1.readFile(input, { encoding: 'utf-8' }, cb); })];
                case 1:
                    inputFile = (_c.sent());
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _c.sent();
                    throw "Can't find fle: " + input;
                case 3:
                    batch = inputFile
                        .split('\n')
                        .filter(function (item) { return item.indexOf('##') === -1 && item.length; })
                        .map(function (item) {
                        item = item.replace(/\s/g, '');
                        if (item.indexOf('#') > -1) {
                            return {
                                type: 'hashtag',
                                input: item.split('#')[1]
                            };
                        }
                        if (/^https:\/\/(www|v[a-z]{1})+\.tiktok\.com\/(\w.+|@(\w.+)\/video\/(\d+))$/.test(item)) {
                            return {
                                type: 'video',
                                input: item
                            };
                        }
                        if (item.indexOf('music:') > -1) {
                            return {
                                type: 'music',
                                input: item.split(':')[1]
                            };
                        }
                        if (item.indexOf('id:') > -1) {
                            return {
                                type: 'user',
                                input: item.split(':')[1],
                                by_user_id: true
                            };
                        }
                        if (item.indexOf('@') > -1) {
                            item = item.replace(/@/g, '');
                        }
                        return {
                            type: 'user',
                            input: item
                        };
                    });
                    if (!batch.length) {
                        throw "File is empty: " + input;
                    }
                    if (!(options === null || options === void 0 ? void 0 : options.proxyFile)) return [3 /*break*/, 5];
                    _a = options;
                    return [4 /*yield*/, proxyFromFile(options === null || options === void 0 ? void 0 : options.proxyFile)];
                case 4:
                    _a.proxy = _c.sent();
                    _c.label = 5;
                case 5:
                    if (!(options === null || options === void 0 ? void 0 : options.sessionFile)) return [3 /*break*/, 7];
                    _b = options;
                    return [4 /*yield*/, sessionFromFile(options === null || options === void 0 ? void 0 : options.sessionFile)];
                case 6:
                    _b.sessionList = _c.sent();
                    _c.label = 7;
                case 7: return [4 /*yield*/, batchProcessor(batch, options)];
                case 8:
                    result = _c.sent();
                    return [2 /*return*/, { table: result }];
            }
        });
    });
};
exports.fromfile = fromfile;
