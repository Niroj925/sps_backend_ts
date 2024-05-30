import { parseAndExport } from "./parseCsv";

async function preprocessData() {
    const rawData:any = await parseAndExport();

    const cleanedData = rawData.filter((entry: any) => {
        for (let key in entry) {
            if (typeof entry[key] === 'string') {
                entry[key] = entry[key].toLowerCase();
            }
            if ((key === 'bmi' && entry[key] === 'n/a') || (key === 'smoking_status' && entry[key] === 'unknown')) {
                return false;
            }
        }
        return true;
    });

    cleanedData.forEach((entry: any) => {
        entry.avg_glucose_level = Math.round(parseFloat(entry.avg_glucose_level));
        entry.bmi = Math.round(parseFloat(entry.bmi));
    });

    cleanedData.forEach((entry: any) => {
        entry.avg_glucose_level = entry.avg_glucose_level.toString();
        entry.bmi = entry.bmi.toString();
    });

    const strokeOneData = cleanedData.filter((entry: any) => entry.stroke === '1');
    const strokeZeroData = cleanedData.filter((entry: any) => entry.stroke === '0');

    const reducedStrokeZeroData = strokeZeroData.slice(0, Math.min(strokeZeroData.length, 300));
    const combinedData = reducedStrokeZeroData.concat(strokeOneData);

    const sortedData = combinedData.sort((a: any, b: any) => {
        return parseInt(a.id) - parseInt(b.id);
    });

    return sortedData;
}
const dataPromise = preprocessData();
// const dd=await preprocessData();
// console.log('data:',dd);
export { dataPromise };
