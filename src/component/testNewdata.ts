import { predict } from "./predict";

function testNewData(newData:any, classPriors:any, conditionalProbabilities:any) {
    const predictions = [];
 
      const { predictedClass, strokeProbability, notStrokeProbability } = predict(
        newData,
        classPriors,
        conditionalProbabilities
      );
      const predictClass = predictedClass;
      const probabilities={
          stroke:strokeProbability.toFixed(2),
          no_stroke:notStrokeProbability.toFixed(2)
      }
      predictions.push({
        predictClass,
        probabilities
      });
  
    return predictions;
  }

  export {testNewData}
