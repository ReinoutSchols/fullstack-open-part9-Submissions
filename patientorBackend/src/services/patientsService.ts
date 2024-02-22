import patientsData from "../data/patients";
import { v4 as uuidv4 } from "uuid";
import { Patients, PatientsWithoutSsn, NewPatientType } from "../types";

const patients: Patients[] = patientsData;

const getPatientsWithoutSsn = (): PatientsWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
const getPatients = (): Patients[] => {
  return patients;
};

const addPatient = (entry: NewPatientType): Patients => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
};
