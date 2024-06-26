// Function to predict the class and probabilities for a given instance
function predict(instance:any, classPriors:any, conditionalProbabilities:any) {
    let maxProbability = -1;
    let predictedClass = null;
    let strokeProbability = 0;
    let notStrokeProbability = 0;

    // console.log(classPriors)
    // console.log(conditionalProbabilities)

    Object.keys(classPriors).forEach((className) => {
        
        let probability = classPriors[className];
    
        Object.keys(instance).forEach((feature) => {
            if (
                conditionalProbabilities[feature] &&
                conditionalProbabilities[feature][instance[feature]] &&
                conditionalProbabilities[feature][instance[feature]][className]
            ) {
                
                probability *= conditionalProbabilities[feature][instance[feature]][className];
              
            }
        });

        if (probability > maxProbability) {
            maxProbability = probability;
            predictedClass = className;
        }

        // Assign probabilities to strokeProbability and notStrokeProbability
        if (className === "1") {
            strokeProbability = probability;
        } else {
            notStrokeProbability = probability;
        }
    });

    const totalProbability = strokeProbability + notStrokeProbability;
    strokeProbability = (strokeProbability / totalProbability) * 100;
    notStrokeProbability = (notStrokeProbability / totalProbability) * 100;

    return { predictedClass, strokeProbability, notStrokeProbability };
}

export { predict };
