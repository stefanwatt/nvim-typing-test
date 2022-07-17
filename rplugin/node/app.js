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
const levenshtein_1 = require("./levenshtein");
const opts = { pattern: '*' };
const linesToString = (lines) => (lines.length === 1 ? lines[0] : lines.reduce((previous, current) => `${previous}\n${current}`, '')).trim();
const template = "This is some sample text!";
module.exports = (plugin) => {
    const print = (text) => {
        plugin.nvim.lua(`print('${text}')`);
    };
    const compareBufferTextToTemplate = () => __awaiter(void 0, void 0, void 0, function* () {
        const buf = yield nvim.buffer;
        const lines = yield buf.lines;
        const bufText = linesToString(lines);
        print(`${(0, levenshtein_1.distanceAsPercentage)(bufText, template)}% similarity`);
    });
    const { nvim } = plugin;
    plugin.registerAutocmd('TextChangedI', () => __awaiter(void 0, void 0, void 0, function* () {
        yield compareBufferTextToTemplate();
    }), opts);
    plugin.registerAutocmd('TextChanged', () => __awaiter(void 0, void 0, void 0, function* () {
        yield compareBufferTextToTemplate();
    }), opts);
};
//# sourceMappingURL=app.js.map