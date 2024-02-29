import {
  Diagnosis,
  Gender,
  HealthCheckRating,
  NewPatientType,
  HospitalEntry,
  // EntryWithoutId,
  Entry,
  OccupationalHealthcareEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name " + name);
  }
  return name;
};

export const isDateOfBirth = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDateOfBirth(dateOfBirth)) {
    throw new Error("Incorrect or missing DateOfBirth: " + dateOfBirth);
  }
  return dateOfBirth;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("incorrect or missing occupation " + occupation);
  }
  return occupation;
};

export const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("incorrect or missing ssn " + ssn);
  }
  return ssn;
};

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("incorrect or missing gender " + gender);
  }
  return gender;
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  console.log(object);
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("incorrect description " + description);
  }
  return description;
};

export const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("incorrect employerName " + employerName);
  }
  return employerName;
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    typeof rating !== "number" ||
    isNaN(rating) ||
    !Object.values(HealthCheckRating).includes(rating)
  ) {
    throw new Error("Invalid HealthCheckRating: " + rating);
  }
  return rating;
};

export const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("incorrect specialist " + specialist);
  }
  return specialist;
};

export const parseID = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error("incorrect id " + id);
  }
  return id;
};

export const parseEntry = (entry: unknown): Entry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Invalid entry format");
  }
  const { type } = entry as { type: string };

  switch (type) {
    case "Hospital":
      console.log(entry);
      if (
        "description" in entry &&
        "specialist" in entry &&
        "discharge" in entry &&
        "date" in entry &&
        "type" in entry &&
        "id" in entry
      )
        return {
          id: parseID(entry.id),
          type: "Hospital",
          description: parseDescription(entry.description),
          specialist: parseSpecialist(entry.specialist),
          date: parseDateOfBirth(entry.date),
          discharge: {
            ...(entry as HospitalEntry).discharge,
            date: parseDateOfBirth((entry as HospitalEntry).discharge.date),
          },
        };
      else {
        throw new Error(
          "Incorrect data: some fields are missing from the hospital entry"
        );
      }
    case "HealthCheck":
      console.log(entry);
      if (
        "description" in entry &&
        "specialist" in entry &&
        "healthCheckRating" in entry &&
        "date" in entry &&
        "type" in entry &&
        "id" in entry
      )
        return {
          id: parseID(entry.id),
          type: "HealthCheck",
          description: parseDescription(entry.description),
          specialist: parseSpecialist(entry.specialist),
          healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
          date: parseDateOfBirth(entry.date),
        };
      throw new Error(
        "Incorrect data: some fields are missing from the HealthCheck entry"
      );
    case "OccupationalHealthcare":
      console.log(entry);
      if (
        "description" in entry &&
        "specialist" in entry &&
        "date" in entry &&
        "employerName" in entry &&
        "type" in entry &&
        "id" in entry &&
        "diagnosisCodes" in entry &&
        "sickLeave" in entry
      )
        return {
          type: "OccupationalHealthcare",
          id: parseID(entry.id),
          description: parseDescription(entry.description),
          specialist: parseSpecialist(entry.specialist),
          date: parseDateOfBirth(entry.date),
          employerName: parseEmployerName(entry.employerName),
          diagnosisCodes: parseDiagnosisCodes({
            diagnosisCodes: entry.diagnosisCodes,
          }),
          sickLeave: {
            ...(entry as OccupationalHealthcareEntry).sickLeave,
            startDate: parseDateOfBirth(
              (entry as OccupationalHealthcareEntry).sickLeave?.startDate
            ),
            endDate: parseDateOfBirth(
              (entry as OccupationalHealthcareEntry).sickLeave?.endDate
            ),
          },
        };
      throw new Error(
        "Incorrect data: some fields are missing from the OccupationalHealthcare entry"
      );
  }
  throw new Error("Incorrect data: some fields of the entry are missing");
};

export const parseEntries = (entries: unknown[] = []): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Entries must be an array");
  }
  return entries.map((entry) => parseEntry(entry));
};

const toNewPatientEntry = (object: unknown): NewPatientType => {
  if (!object || typeof object !== "object") {
    throw new Error("incorrect or missing data");
  }

  if (
    "name" in object &&
    "occupation" in object &&
    "gender" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientType = {
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      entries: Array.isArray(object.entries)
        ? parseEntries(object.entries)
        : [],
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};
export default toNewPatientEntry;
