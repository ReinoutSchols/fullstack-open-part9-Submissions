interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface Input {
  exerciseNums: number[];
  target: number;
}

const parseArguments = (args: string[]): Input => {
  const exerciseNums = args.slice(3).map(Number);
  const target = Number(args[2]);
  if (exerciseNums.length < 3) {
    throw new Error("Input has to be more than 3 days. ");
  }
  if (!isNaN(target) && exerciseNums.every((num) => !isNaN(num))) {
    return { exerciseNums, target };
  } else {
    throw new Error("One or more of the provided values is not a number!");
  }
};

const calculateRating = (average: number, target: number): number => {
  const percentage = (average / target) * 100;

  if (percentage >= 100) {
    return 3;
  } else if (percentage >= 80) {
    return 2;
  } else {
    return 1;
  }
};

const exerciseCalculator = (values: number[], target: number) => {
  const periodLength = values.length;
  const trainingDays = values.filter((v) => v !== 0).length;
  const average =
    values.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / periodLength;
  const rating = calculateRating(average, target);
  const success = rating > 2;

  const ratingDescriptions = [
    "You did not reach the exercise target, you can do better!",
    "You almost reached the exercise target, not bad!",
    "You exceeded the exercise target, great job!",
  ];
  const ratingDescription = ratingDescriptions[rating - 1];

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

try {
  const { exerciseNums, target } = parseArguments(process.argv);
  console.log(exerciseCalculator(exerciseNums, target));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.error(error.message);
}

export { exerciseCalculator };
