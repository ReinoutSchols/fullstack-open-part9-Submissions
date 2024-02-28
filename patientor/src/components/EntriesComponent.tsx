import { Entry, Map } from "../types";
import {
  PropsEntriesComponent,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

const EntriesComponent = ({ diagnoses, patient }: PropsEntriesComponent) => {
  const diagnosisMap: Map = diagnoses.reduce((map: Map, diagnosis) => {
    map[diagnosis.code] = diagnosis.name;
    return map;
  }, {});
  console.log("diagnosismap", diagnosisMap);

  patient.entries.forEach((entry: Entry) => {
    entry.diagnosisNames = entry.diagnosisCodes
      ? entry.diagnosisCodes.map(
          (code) => diagnosisMap[code] || "Unknown diagnosis"
        )
      : undefined;
  });

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const HospitalEntries = (entry: HospitalEntry) => {
    return (
      <>
        {entry.date} <LocalPharmacyIcon />
        <br /> <i>{entry.description}</i>
        <br />
        diagnose by {entry.specialist}
        <div style={{ fontWeight: "bold" }}>
          discharge date: {entry.discharge.date} <br />
          discharge criteria: {entry.discharge.criteria}
        </div>
        <ul>
          {entry.diagnosisCodes && diagnoses
            ? entry.diagnosisCodes.map((c, index) => (
                <li key={index}>
                  {" "}
                  {c}{" "}
                  {diagnoses.find((d) => d.code === c)?.name ||
                    "unknown diagnosis"}
                </li>
              ))
            : null}
        </ul>
      </>
    );
  };

  const OccupationalHealthcareEntries = (
    entry: OccupationalHealthcareEntry
  ) => {
    return (
      <>
        {entry.date} <WorkIcon />{" "}
        <i>
          <strong>{entry.employerName}</strong>
        </i>
        <br /> <i>{entry.description}</i>
        <br />
        diagnose by {entry.specialist}
        <br />
        {!entry.sickLeave ? undefined : (
          <div style={{ fontWeight: "bold" }}>
            start date of sickleave: {entry.sickLeave.startDate}
            <br />
            end date of sickleave: {entry.sickLeave.endDate}
          </div>
        )}
        <ul>
          {entry.diagnosisCodes && diagnoses
            ? entry.diagnosisCodes.map((c, index) => (
                <li key={index}>
                  {" "}
                  {c}{" "}
                  {diagnoses.find((d) => d.code === c)?.name ||
                    "unknown diagnosis"}
                </li>
              ))
            : null}
        </ul>
      </>
    );
  };

  const HealthCheckEntries = (entry: HealthCheckEntry) => {
    return (
      <>
        <p>
          {entry.date} <LocalHospitalIcon />
          <br /> <i>{entry.description}</i>
          <br />
          <strong>Healthcheck rating: {entry.healthCheckRating}</strong> <br />
          diagnose by {entry.specialist} <br />
        </p>
        <ul>
          {entry.diagnosisCodes && diagnoses
            ? entry.diagnosisCodes.map((c, index) => (
                <li key={index}>
                  {" "}
                  {c}{" "}
                  {diagnoses.find((d) => d.code === c)?.name ||
                    "unknown diagnosis"}
                </li>
              ))
            : null}
        </ul>
      </>
    );
  };

  return (
    <div>
      {patient.entries.map((entry: Entry, index) => {
        switch (entry.type) {
          case "Hospital":
            return (
              <div
                style={{
                  borderStyle: "solid",
                  borderRadius: "1em",
                  margin: "0.3em",
                }}
                key={index}
              >
                {" "}
                {HospitalEntries(entry)}
              </div>
            );
          case "OccupationalHealthcare":
            return (
              <div
                style={{
                  borderStyle: "solid",
                  borderRadius: "1em",
                  margin: "0.3em",
                }}
                key={index}
              >
                {OccupationalHealthcareEntries(entry)}
              </div>
            );
          case "HealthCheck":
            return (
              <div
                style={{
                  borderStyle: "solid",
                  borderRadius: "1em",
                  margin: "0.3em",
                }}
                key={index}
              >
                {HealthCheckEntries(entry)}
              </div>
            );
          default:
            return assertNever(entry);
        }
      })}
    </div>
  );
};

export default EntriesComponent;
