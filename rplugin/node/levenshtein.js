"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceAsPercentage = void 0;
const fast_levenshtein_1 = __importDefault(require("fast-levenshtein"));
const s1 = "This is some text";
const s2 = "This is some text";
const distanceAsPercentage = (s1, s2) => {
    const distance = fast_levenshtein_1.default.get(s1, s2);
    const maxLength = Math.max(s1.length, s2.length);
    const percentage = 100 * (maxLength - distance) / maxLength;
    return Math.round(percentage);
};
exports.distanceAsPercentage = distanceAsPercentage;
//# sourceMappingURL=levenshtein.js.map