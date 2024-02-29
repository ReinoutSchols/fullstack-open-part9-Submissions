import axios from "axios";
import {
  Diagnosis,
  // Entry,
  HealthCheckEntryFormValues,
  Patient,
  PatientFormValues,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const createEntry = async (object: HealthCheckEntryFormValues, id: string) => {
  console.log("logging object in createEntry:", object);
  console.log("logging id in createEntry:", id);
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    { ...object, id: id }
  );
  return data;
};

export default {
  getAll,
  create,
  getPatient,
  getDiagnoses,
  createEntry,
};
