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
const linesToString = (lines) => lines.reduce((previous, current) => `${previous}\n${current}`, '');
exports.default = (plugin) => {
    const opts = { pattern: '*' };
    const { nvim } = plugin;
    plugin.registerAutocmd('TextChangedI', () => __awaiter(void 0, void 0, void 0, function* () {
        const buf = yield nvim.buffer;
        const lines = yield buf.lines;
        const bufText = linesToString(lines);
        console.log('buffer text changed :\n' + bufText);
    }), opts);
};
