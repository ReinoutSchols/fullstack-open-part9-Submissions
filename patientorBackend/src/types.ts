export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export type PatientsWithoutSsn = Omit<Patients, "ssn" | "entries">;
export type NewPatientType = Omit<Patients, "id">;
export type NonSensitivePatient = Omit<Patients, "ssn" | "entries">;
