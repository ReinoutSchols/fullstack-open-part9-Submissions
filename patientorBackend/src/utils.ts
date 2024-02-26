// import { Entry, Gender, NewPatientType } from "./types";

// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

// const parseName = (name: unknown): string => {
//   if (!isString(name)) {
//     throw new Error("Incorrect or missing name " + name);
//   }
//   return name;
// };

// const isDateOfBirth = (dateOfBirth: string): boolean => {
//   return Boolean(Date.parse(dateOfBirth));
// };

// const parseDateOfBirth = (dateOfBirth: unknown): string => {
//   if (!isString(dateOfBirth) || !isDateOfBirth(dateOfBirth)) {
//     throw new Error("Incorrect or missing DateOfBirth: " + dateOfBirth);
//   }
//   return dateOfBirth;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!isString(occupation)) {
//     throw new Error("incorrect or missing occupation " + occupation);
//   }
//   return occupation;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!isString(ssn)) {
//     throw new Error("incorrect or missing ssn " + ssn);
//   }
//   return ssn;
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender)
//     .map((g) => g.toString())
//     .includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//     throw new Error("incorrect or missing gender " + gender);
//   }
//   return gender;
// };

// export const parseEntries = (entries: unknown[] = []): Entry[] => {
//   if (!Array.isArray(entries)) {
//     throw new Error("Entries must be an array");
//   }

//   if (entries.length === 0) {
//     // If entries array is empty, return an empty array
//     return [];
//   }

//   // Validate each entry in the array
//   const parsedEntries: Entry[] = entries.map((entry: unknown) => {
//     if (!entry || typeof entry !== "object") {
//       throw new Error("Invalid entry format");
//     }

//     // Add your specific validation logic for each entry here

//     return entry as Entry;
//   });

//   return parsedEntries;
// };
// const toNewPatientEntry = (object: unknown): NewPatientType => {
//   if (!object || typeof object !== "object") {
//     throw new Error("incorrect or missing data");
//   }

//   if (
//     "name" in object &&
//     "occupation" in object &&
//     "gender" in object &&
//     "dateOfBirth" in object &&
//     "ssn" in object &&
//     "entries" in object
//   ) {
//     const newEntry: NewPatientType = {
//       name: parseName(object.name),
//       occupation: parseOccupation(object.occupation),
//       gender: parseGender(object.gender),
//       dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//       ssn: parseSsn(object.ssn),
//       entries: parseEntries(object["entries"]),
//     };

//     return newEntry;
//   }
//   throw new Error("Incorrect data: some fields are missing");
// };
// export default toNewPatientEntry;
