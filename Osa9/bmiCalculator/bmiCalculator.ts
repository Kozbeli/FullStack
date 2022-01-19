export const calculateBmi = (a: number, b: number): string => {
  if (a === 0) {
    return 'error, can\'t divide by zero';
  }
  const bmi = b / (a * a) * 10000;
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi > 25.0) {
    return 'Overweight';
  }
  return 'Normal (healthy weight)';

};

const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

console.log(calculateBmi(a, b));