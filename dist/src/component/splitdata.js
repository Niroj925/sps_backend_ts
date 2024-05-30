"use strict";
// async function splitData(data: any, splitRatio: any) {
//   const splitIndex = Math.floor(data.length * splitRatio);
//   const trainingData = data.slice(0, splitIndex);
//   const testData = data.slice(splitIndex + 1, data.length);
//   return {
//       trainingData,
//       testData
//   };
// }
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
exports.splitData = void 0;
function splitData(dataPromise, splitRatio) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield dataPromise;
        const splitIndex = Math.floor(data.length * splitRatio);
        const trainingData = data.slice(0, splitIndex);
        const testData = data.slice(splitIndex, data.length);
        return { trainingData, testData };
    });
}
exports.splitData = splitData;
