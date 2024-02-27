import express from "express";
import patientsService from "../services/patientsService";
// import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getPatientsWithoutSsn();
  res.send(patients);
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientsService.getPatient(id);
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = "something went wrong";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// router.post("/", (req, res) => {
//   try {
//     const NewPatientType = toNewPatientEntry(req.body);

//     const addedPatient = patientsService.addPatient(NewPatientType);
//     res.json(addedPatient);
//   } catch (error: unknown) {
//     let errorMessage = "something went wrong";
//     if (error instanceof Error) {
//       errorMessage += "Error: " + error.message;
//     }
//     res.status(400).send(errorMessage);
//   }
// });

export default router;
