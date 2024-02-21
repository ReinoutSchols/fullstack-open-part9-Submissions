/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (
    isNaN(height) ||
    isNaN(weight) ||
    !req.query.height ||
    !req.query.weight
  ) {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }
  const bmi = calculateBmi(height, weight);
  return res.send({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const target = Number(req.body.target);
  const exercises: number[] = req.body.daily_exercises;
  console.log(target, exercises);
  if (!target || !Array.isArray(exercises)) {
    return res.status(400).send({
      error: "parameters missing",
    });
  }
  if (isNaN(target) || exercises.some((num) => isNaN(num))) {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }

  const result = exerciseCalculator(exercises, target);
  return res.send(result);
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
