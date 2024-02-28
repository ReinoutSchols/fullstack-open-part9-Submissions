import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Diagnosis, Entry, Patient, Map } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient(id!);
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const fetchedDiagnoses: Diagnosis[] = await patientService.getDiagnoses();
      setDiagnoses(fetchedDiagnoses);
    };
    void fetchDiagnoses();
  }, [id]);

  if (!patient) return <div>Loading...</div>;
  if (!diagnoses) return <div>Loading...</div>;

  if (patient.entries.length === 0) {
    return (
      <div>
        <h2>
          {patient.name}{" "}
          {patient.gender === "male" ? (
            <MaleIcon />
          ) : patient.gender === "female" ? (
            <FemaleIcon />
          ) : (
            <AccessibilityIcon />
          )}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <div>No entries found</div>
      </div>
    );
  }

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

  const diagnosisListItems = () => {
    return (
      <ul>
        {patient.entries[0].diagnosisCodes && diagnoses
          ? patient.entries[0].diagnosisCodes.map((c, index) => (
              <li key={index}>
                {" "}
                {c}{" "}
                {diagnoses.find((d) => d.code === c)?.name ||
                  "unknown diagnosis"}
              </li>
            ))
          : null}
      </ul>
    );
  };

  const otherEntries = () => {
    return (
      <>
        {patient.entries
          ? patient.entries.map((e) => {
              console.log("e.date", e.date);
              return (
                <p>
                  {e.date} {e.description}
                </p>
              );
            })
          : null}
      </>
    );
  };

  const Icon =
    patient.gender === "male"
      ? MaleIcon
      : patient.gender === "female"
      ? FemaleIcon
      : AccessibilityIcon;

  console.log("logging patient in SinglePatient", patient);
  console.log("logging diagnoses in SinglePatient component", diagnoses);

  return (
    <div>
      <h2>
        {patient.name} <Icon />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {otherEntries()}
      {diagnosisListItems()}
    </div>
  );
};

export default SinglePatient;
