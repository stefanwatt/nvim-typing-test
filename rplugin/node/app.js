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
const stopwatch_node_1 = require("stopwatch-node");
const opts = { pattern: '*' };
const linesToString = (lines) => (lines.length === 1 ? lines[0] : lines.reduce((previous, current) => `${previous}\n${current}`, '')).trim();
const template = `
  const compareBufferTextToTemplate = async ()=>{
    const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    print(\`\${distanceAsPercentage(bufText,template)}% similarity\`)
  }
`.trim();
const stopwatch = new stopwatch_node_1.StopWatch();
module.exports = (plugin) => {
    const print = (text) => {
        plugin.nvim.lua(`print('${text}')`);
    };
    const startTypingTest = () => __awaiter(void 0, void 0, void 0, function* () {
        stopwatch.start();
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            if (!stopwatch.isRunning())
                return;
            const bufText = yield getBufText();
            const distanceAsPercentage = (0, levenshtein_1.getDistanceAsPercentage)(bufText, template);
            print(statusText(distanceAsPercentage));
        }), 1000);
    });
    const completeTest = () => {
        stopwatch.stop();
        print(`Test completed in ${Math.round(stopwatch.getTotalTime() / 1000)} seconds`);
    };
    const statusText = (distanceAsPercentage) => {
        if (!stopwatch.isRunning())
            return 'Test not started';
        else {
            return `${stopwatch.shortSummary()} - ${distanceAsPercentage}% similarity`;
        }
    };
    const getBufText = () => __awaiter(void 0, void 0, void 0, function* () {
        const buf = yield nvim.buffer;
        const lines = yield buf.lines;
        const bufText = linesToString(lines);
        return bufText;
    });
    const compareBufferTextToTemplate = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!stopwatch.isRunning())
            return;
        const bufText = yield getBufText();
        const distanceAsPercentage = (0, levenshtein_1.getDistanceAsPercentage)(bufText, template);
        if (distanceAsPercentage === 100) {
            completeTest();
            return;
        }
        print(statusText(distanceAsPercentage));
    });
    const { nvim } = plugin;
    plugin.registerCommand('TypingTestStart', startTypingTest, { sync: false });
    plugin.registerAutocmd('TextChangedI', compareBufferTextToTemplate, opts);
    plugin.registerAutocmd('TextChanged', compareBufferTextToTemplate, opts);
};
//# sourceMappingURL=app.js.map