const calculateBmi = (height: number, weight: number) => {
    console.log(height)
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
let height: number = Number(process.argv[2])
let weight: number = Number(process.argv[3])

console.log(`You are ${calculateBmi(height, weight)}`)