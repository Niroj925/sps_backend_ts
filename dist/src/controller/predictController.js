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
const probabilities_1 = require("../component/probabilities");
const splitdata_1 = require("../component/splitdata");
const dataSet_1 = require("../component/dataSet");
const testNewdata_1 = require("../component/testNewdata");
// import { conditionalProbabilities, testConditionalProbabilities } from "../component/train";
const train_1 = require("../component/train");
const evaluate_1 = require("../component/evaluate");
class PredictController {
    result(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { conditionalProbabilities } = yield (0, train_1.initializeProbabilities)();
            try {
                const { gender, age, hypertension, heart_disease, ever_married, work_type, residence_type, avg_glucose_level, bmi, smoking_status, } = req.body;
                const agl = (Math.round(parseFloat(avg_glucose_level))).toString();
                const rbmi = (Math.round(parseFloat(bmi))).toString();
                const newData = {
                    gender,
                    age,
                    hypertension,
                    heart_disease,
                    ever_married,
                    work_type,
                    residence_type,
                    avg_glucose_level: agl,
                    bmi: rbmi,
                    smoking_status,
                };
                console.log(newData);
                const data = yield dataSet_1.dataPromise;
                const { trainingData } = yield (0, splitdata_1.splitData)(data, 0.8);
                const classPriors = (0, probabilities_1.calculateClassPriors)(trainingData);
                const result = (0, testNewdata_1.testNewData)(newData, classPriors, conditionalProbabilities);
                res.json(result);
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    accuracy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { testConditionalProbabilities } = yield (0, train_1.initializeProbabilities)();
            try {
                const data = yield dataSet_1.dataPromise;
                const { trainingData, testData } = yield (0, splitdata_1.splitData)(data, 0.8);
                const classPriors = (0, probabilities_1.calculateClassPriors)(testData);
                const accuracy = (0, evaluate_1.evaluate)(testData, classPriors, testConditionalProbabilities);
                res.json(accuracy);
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
}
exports.default = PredictController;
