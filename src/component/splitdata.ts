// async function splitData(data: any, splitRatio: any) {
//   const splitIndex = Math.floor(data.length * splitRatio);
//   const trainingData = data.slice(0, splitIndex);
//   const testData = data.slice(splitIndex + 1, data.length);
//   return {
//       trainingData,
//       testData
//   };
// }

async function splitData(dataPromise: Promise<any>, splitRatio: number) {
  const data = await dataPromise;
  const splitIndex = Math.floor(data.length * splitRatio);
  const trainingData = data.slice(0, splitIndex);
  const testData = data.slice(splitIndex, data.length);
  return { trainingData, testData };
}

export { splitData };



