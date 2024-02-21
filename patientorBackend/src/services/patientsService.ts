import patientsData from "../data/patients";
import { PatientsWithoutSsn } from "../types";

import { Patients } from "../types";

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
export default {
  getPatients,
  getPatientsWithoutSsn,
};
