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
const opts = { pattern: '*' };
const linesToString = (lines) => lines.reduce((previous, current) => `${previous}\n${current}`, '');
const sampleText = "This is some sample text!";
module.exports = (plugin) => {
    const print = (text) => {
        plugin.nvim.lua(`print('${text}')`);
    };
    const { nvim } = plugin;
    plugin.registerAutocmd('TextChanged', () => __awaiter(void 0, void 0, void 0, function* () {
        const buf = yield nvim.buffer;
        const lines = yield buf.lines;
        const bufText = linesToString(lines);
        if (bufText.includes(sampleText))
            print("success");
        else
            print('not quite there yet');
    }), opts);
};
