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
exports.dataPromise = void 0;
const parseCsv_1 = require("./parseCsv");
function preprocessData() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawData = yield (0, parseCsv_1.parseAndExport)();
        const cleanedData = rawData.filter((entry) => {
            for (let key in entry) {
                if (typeof entry[key] === 'string') {
                    entry[key] = entry[key].toLowerCase();
                }
                if ((key === 'bmi' && entry[key] === 'n/a') || (key === 'smoking_status' && entry[key] === 'unknown')) {
                    return false;
                }
            }
            return true;
        });
        cleanedData.forEach((entry) => {
            entry.avg_glucose_level = Math.round(parseFloat(entry.avg_glucose_level));
            entry.bmi = Math.round(parseFloat(entry.bmi));
        });
        cleanedData.forEach((entry) => {
            entry.avg_glucose_level = entry.avg_glucose_level.toString();
            entry.bmi = entry.bmi.toString();
        });
        const strokeOneData = cleanedData.filter((entry) => entry.stroke === '1');
        const strokeZeroData = cleanedData.filter((entry) => entry.stroke === '0');
        const reducedStrokeZeroData = strokeZeroData.slice(0, Math.min(strokeZeroData.length, 300));
        const combinedData = reducedStrokeZeroData.concat(strokeOneData);
        const sortedData = combinedData.sort((a, b) => {
            return parseInt(a.id) - parseInt(b.id);
        });
        return sortedData;
    });
}
const dataPromise = preprocessData();
exports.dataPromise = dataPromise;
