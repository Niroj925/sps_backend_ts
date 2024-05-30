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
exports.initializeProbabilities = void 0;
// probabilities.ts
const probabilities_1 = require("./probabilities");
const dataSet_1 = require("./dataSet");
const splitdata_1 = require("./splitdata");
function initializeProbabilities() {
    return __awaiter(this, void 0, void 0, function* () {
        const { trainingData, testData } = yield (0, splitdata_1.splitData)(dataSet_1.dataPromise, 0.8);
        const classPriors = (0, probabilities_1.calculateClassPriors)(trainingData);
        const conditionalProbabilities = {};
        Object.keys(trainingData[0]).forEach((feature) => {
            conditionalProbabilities[feature] = {};
            const featureValues = [...new Set(trainingData.map((instance) => instance[feature]))];
            featureValues.forEach((value) => {
                conditionalProbabilities[feature][value] = {};
                Object.keys(classPriors).forEach((className) => {
                    conditionalProbabilities[feature][value][className] =
                        (0, probabilities_1.calculateConditionalProbabilities)(trainingData, feature, value, className);
                });
            });
        });
        const testClassPriors = (0, probabilities_1.calculateClassPriors)(testData);
        const testConditionalProbabilities = {};
        Object.keys(testData[0]).forEach((feature) => {
            testConditionalProbabilities[feature] = {};
            const featureValues = [...new Set(testData.map((instance) => instance[feature]))];
            featureValues.forEach((value) => {
                testConditionalProbabilities[feature][value] = {};
                Object.keys(testClassPriors).forEach((className) => {
                    testConditionalProbabilities[feature][value][className] =
                        (0, probabilities_1.calculateConditionalProbabilities)(testData, feature, value, className);
                });
            });
        });
        return { conditionalProbabilities, testConditionalProbabilities };
    });
}
exports.initializeProbabilities = initializeProbabilities;
