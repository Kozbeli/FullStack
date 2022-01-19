interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (exercises: Array<number>, target: number): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(e => e > 0).length;

  const totalHours = exercises.reduce((acc, h) => acc + h);
  const targetHours = target * periodLength;
  const average = totalHours / periodLength;

  const successRatio = totalHours / targetHours;
  const success = (totalHours >= targetHours);

  let rating = 1;
  let ratingDescription = 'could be much better';

  if (successRatio > 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  if (successRatio > 0.97) {
    rating = 3;
    ratingDescription = 'very good';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const [, , target, ...rest] = process.argv;
const exerscises: number[] = rest.map(n => Number(n));

console.log(calculateExercises(exerscises, Number(target)));