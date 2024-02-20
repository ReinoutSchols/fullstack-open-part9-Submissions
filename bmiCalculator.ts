const calculateBmi = (height: number, weight: number): string => {
    let bmi = weight / (height / 100 * height / 100); 
    console.log(bmi)
    if (bmi < 18.5) {
        return "Underweight";
    }
    if (bmi < 25) {
        return "Normal (healthy weight)";
    }
    if (bmi < 30) {
        return "Overweight";
    }
    return "Obese";
}

console.log(calculateBmi(180, 70));