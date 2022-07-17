"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeconds = exports.stopwatch = void 0;
const ts_stopwatch_1 = require("ts-stopwatch");
exports.stopwatch = new ts_stopwatch_1.Stopwatch();
const getSeconds = () => {
    return Math.round(exports.stopwatch.getTime() / 1000);
};
exports.getSeconds = getSeconds;
//# sourceMappingURL=stopwatch.js.map