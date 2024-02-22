export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export type PatientsWithoutSsn = Omit<Patients, "ssn">;
export type NewPatientType = Omit<Patients, "id">;
