"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = exports.getBufText = exports.initNvim = exports.autoCmdOptions = void 0;
const linesToString = (lines) => (lines.length === 1 ? lines[0] : lines.reduce((previous, current) => `${previous}\n${current}`, '')).trim();
let nvim;
exports.autoCmdOptions = { pattern: '*' };
const initNvim = (nvimInstance) => {
    if (!!nvim)
        return;
    nvim = nvimInstance;
};
exports.initNvim = initNvim;
const getBufText = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!nvim)
        throw new Error('nvim instance not initialized');
    const buf = yield nvim.buffer;
    const lines = yield buf.lines;
    const bufText = linesToString(lines);
    return bufText;
});
exports.getBufText = getBufText;
const print = (text) => {
    nvim.lua(`print('${text}')`);
};
exports.print = print;
//# sourceMappingURL=nvim.js.map