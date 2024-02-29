import patientsData from "../data/patients";
import { v4 as uuidv4 } from "uuid";
import {
  Patients,
  PatientsWithoutSsn,
  NewPatientType,
  Entry,
  // EntryWithoutId,
} from "../types";

const patients: Patients[] = patientsData;

const getPatientsWithoutSsn = (): PatientsWithoutSsn[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
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
const addEntry = (entry: Entry, id: string): Entry[] => {
  const patientIndex = patients.findIndex((patient) => patient.id === id);

  const updatedPatients = [...patients];
  updatedPatients[patientIndex] = {
    ...updatedPatients[patientIndex],
    entries: [...updatedPatients[patientIndex].entries, entry],
  };

  return updatedPatients[patientIndex].entries;
};

const getNonSensitivePatient = (id: string): Patients | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    return undefined;
  }
  return {
    ...patient,
    entries: [] as Entry[],
  };
};

const getPatient = (id: string): Patients | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    return undefined;
  }
  return {
    ...patient,
  };
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  addPatient,
  getNonSensitivePatient,
  getPatient,
  addEntry,
};
