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
exports.startTypingTest = exports.compareBufferTextToTemplate = void 0;
const stopwatch_1 = require("./stopwatch");
const nvim_1 = require("./nvim");
const levenshtein_1 = require("./levenshtein");
const template = `
const compareBufferTextToTemplate = async ()=>{
  const buf = await nvim.buffer;
  const lines = await buf.lines
  const bufText = linesToString(lines)
  print(\`\${distanceAsPercentage(bufText,template)}% similarity\`)
}`.trim();
const statusText = (distanceAsPercentage) => {
    if (!stopwatch_1.stopwatch.isRunning())
        return 'Test not started';
    else {
        return `${(0, stopwatch_1.getSeconds)()} s elapsed- ${distanceAsPercentage}% similarity`;
    }
};
const completeTest = () => {
    (0, nvim_1.print)(`Test completed in ${stopwatch_1.getSeconds} seconds`);
    stopwatch_1.stopwatch.stop();
    stopwatch_1.stopwatch.reset();
};
const compareBufferTextToTemplate = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!stopwatch_1.stopwatch.isRunning())
        return;
    const bufText = yield (0, nvim_1.getBufText)();
    const distanceAsPercentage = (0, levenshtein_1.getDistanceAsPercentage)(bufText, template);
    if (distanceAsPercentage === 100) {
        completeTest();
        return;
    }
    else {
        (0, nvim_1.print)(statusText(distanceAsPercentage));
    }
});
exports.compareBufferTextToTemplate = compareBufferTextToTemplate;
const startTypingTest = () => __awaiter(void 0, void 0, void 0, function* () {
    stopwatch_1.stopwatch.start();
    stopwatchCycle();
});
exports.startTypingTest = startTypingTest;
const stopwatchCycle = () => {
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.compareBufferTextToTemplate)();
        if (stopwatch_1.stopwatch.isRunning()) {
            stopwatchCycle();
        }
    }), 1000);
};
//# sourceMappingURL=typingTest.js.map