import logger from '@sky0014/logger';
import { BrowserWindow, ipcMain } from 'electron';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var LIB_NAME = "electron-ipc";
var API_KEY = "__sky_ipc";

logger.initLogger({
    enable: true,
    prefix: LIB_NAME,
});
var map = {};
var proxy = new Proxy({}, {
    get: function (target, p) {
        // @ts-ignore
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            BrowserWindow.getAllWindows().forEach(function (win) {
                var _a;
                (_a = win.webContents).send.apply(_a, __spreadArray([API_KEY, p], __read(args), false));
            });
        };
    },
});
ipcMain.handle(API_KEY, function (event, name) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var val = map[name];
    if (val === undefined) {
        logger.warn("no renderer ipc named: ".concat(name));
        return;
    }
    if (typeof val !== "function") {
        return val;
    }
    return val.apply(void 0, __spreadArray([], __read(args), false));
});
function registerIpcMain(ipcMap) {
    Object.assign(map, ipcMap);
}
function getIpcMain() {
    return proxy;
}

export { getIpcMain, registerIpcMain };
