// probabilities.ts
import { calculateClassPriors, calculateConditionalProbabilities } from "./probabilities";
import { dataPromise } from "./dataSet";
import { splitData } from "./splitdata";

async function initializeProbabilities() {
    const { trainingData, testData } = await splitData(dataPromise, 0.8);

    const classPriors = calculateClassPriors(trainingData);

    const conditionalProbabilities: any = {};
    Object.keys(trainingData[0]).forEach((feature) => {
        conditionalProbabilities[feature] = {};
        const featureValues: any = [...new Set(trainingData.map((instance: any) => instance[feature]))];

        featureValues.forEach((value: any) => {
            conditionalProbabilities[feature][value] = {};
            Object.keys(classPriors).forEach((className) => {
                conditionalProbabilities[feature][value][className] =
                    calculateConditionalProbabilities(
                        trainingData,
                        feature,
                        value,
                        className
                    );
            });
        });
    });

    const testClassPriors = calculateClassPriors(testData);

    const testConditionalProbabilities: any = {};
    Object.keys(testData[0]).forEach((feature) => {
        testConditionalProbabilities[feature] = {};
        const featureValues = [...new Set(testData.map((instance: any) => instance[feature]))];

        featureValues.forEach((value: any) => {
            testConditionalProbabilities[feature][value] = {};
            Object.keys(testClassPriors).forEach((className) => {
                testConditionalProbabilities[feature][value][className] =
                    calculateConditionalProbabilities(testData, feature, value, className);
            });
        });
    });

    return { conditionalProbabilities, testConditionalProbabilities };
}

export { initializeProbabilities };
