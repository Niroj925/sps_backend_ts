
// Function to calculate class priors
function calculateClassPriors(data:any) {
    const classCounts:any = {};
    data.forEach((instance:any) => {
        const { stroke } = instance;
        classCounts[stroke] = (classCounts[stroke] || 0) + 1;
    });
    const totalInstances = data.length;
    const classPriors :any= {};
    Object.keys(classCounts).forEach((className) => {
        classPriors[className] = classCounts[className] / totalInstances;
    });
  //   console.log('class priors:', classPriors);
    return classPriors;
  }
  
  // Function to calculate conditional probabilities
  function calculateConditionalProbabilities(data:any, feature:any, value:any, className:any) {
    const instancesWithClass = data.filter(
        (instance:any) => instance.stroke === className
    );
    const totalInstancesWithClass = instancesWithClass.length;
    const instancesWithClassAndValue = instancesWithClass.filter(
        (instance:any) => instance[feature] === value
    ).length;
    const uniqueFeatureValues = new Set(
        data.map((instance:any) => instance[feature])
    );
  
  
    return (
        (instancesWithClassAndValue + 1) /
        (totalInstancesWithClass + uniqueFeatureValues.size)
    );
  }
  
  export {calculateClassPriors,calculateConditionalProbabilities}