interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
  }

  /*
  const parseArguments = (args: string[]): Result => {
    
    }
*/

const calculateRating = (average: number, target: number): number => {
    const percentage = (average / target) * 100;

    if (percentage >= 100) {
        return 3;
    } else if (percentage >= 70) {
        return 2;
    } else {
        return 1;
    }
};

const exerciseCalculator = (values: number[], target: number) => {
    let periodLength = values.length
    let trainingDays = values.filter((v) => v !== 0).length
    let average = (values.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) / periodLength;
    const rating = calculateRating(average, target);
    const success = rating >= 2;

    const ratingDescriptions = [
        "You did not reach the exercise target, you can do better!",
        "You almost reached the exercise target, nice!",
        "You exceeded the exercise target, great job!"
    ];
    const ratingDescription = ratingDescriptions[rating - 1];

    const result: Result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

    return result;
}

const result = exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(result);