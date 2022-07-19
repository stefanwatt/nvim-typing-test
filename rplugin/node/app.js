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
const nvim_1 = require("./nvim");
const typingTest_1 = require("./typingTest");
module.exports = (plugin) => {
    (0, nvim_1.initNvim)(plugin.nvim);
    plugin.registerCommand('CreateBuf', () => __awaiter(void 0, void 0, void 0, function* () { plugin.nvim.createBuffer(false, true); }), { sync: false });
    plugin.registerCommand('TypingTestStart', typingTest_1.startTypingTest, { sync: false });
    plugin.registerCommand('TypingTestQuit', typingTest_1.quitTypingTest, { sync: false });
    plugin.registerAutocmd('TextChangedI', typingTest_1.compareBufferTextToTemplate, nvim_1.autoCmdOptions);
    plugin.registerAutocmd('TextChanged', typingTest_1.compareBufferTextToTemplate, nvim_1.autoCmdOptions);
};
//# sourceMappingURL=app.js.map