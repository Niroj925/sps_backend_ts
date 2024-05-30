"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testNewData = void 0;
const predict_1 = require("./predict");
function testNewData(newData, classPriors, conditionalProbabilities) {
    const predictions = [];
    const { predictedClass, strokeProbability, notStrokeProbability } = (0, predict_1.predict)(newData, classPriors, conditionalProbabilities);
    const predictClass = predictedClass;
    const probabilities = {
        stroke: strokeProbability.toFixed(2),
        no_stroke: notStrokeProbability.toFixed(2)
    };
    predictions.push({
        predictClass,
        probabilities
    });
    return predictions;
}
exports.testNewData = testNewData;
