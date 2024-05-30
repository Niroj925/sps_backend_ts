import { calculateClassPriors } from "../component/probabilities";
import { splitData } from "../component/splitdata";
import { dataPromise } from "../component/dataSet";
import { testNewData } from "../component/testNewdata";
// import { conditionalProbabilities, testConditionalProbabilities } from "../component/train";
import {initializeProbabilities} from "../component/train";
import { evaluate } from "../component/evaluate";
import { Request, Response } from 'express';

export default class PredictController {
 
  async result(req: Request, res: Response) {
    const {conditionalProbabilities}=await initializeProbabilities();
    try {
      const {
        gender,
        age,
        hypertension,
        heart_disease,
        ever_married,
        work_type,
        residence_type,
        avg_glucose_level,
        bmi,
        smoking_status,
      } = req.body;

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
      const data = await dataPromise;
      const { trainingData } = await splitData(data, 0.8);
      const classPriors = calculateClassPriors(trainingData);

      const result = testNewData(newData, classPriors, conditionalProbabilities);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err });
    }
  }

  async accuracy(req: Request, res: Response) {
    const {testConditionalProbabilities}=await initializeProbabilities();
    try {
      const data = await dataPromise;
      const { trainingData, testData } = await splitData(data, 0.8);
      const classPriors = calculateClassPriors(testData);

      const accuracy = evaluate(testData, classPriors, testConditionalProbabilities);
      res.json(accuracy);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err });
    }
  }
}
