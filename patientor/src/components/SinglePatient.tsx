import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Diagnosis, Patient } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import EntriesComponent from "./EntriesComponent";
import Button from "@mui/material/Button";

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

  const Icon =
    patient.gender === "male"
      ? MaleIcon
      : patient.gender === "female"
      ? FemaleIcon
      : AccessibilityIcon;

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

  console.log("logging patient in SinglePatient", patient);
  console.log("logging diagnoses in SinglePatient component", diagnoses);

  return (
    <div>
      <h2>
        {patient.name} <Icon />
      </h2>
      {patient.ssn}
      <br></br>occupation: {patient.occupation}
      <h2>entries</h2>
      <EntriesComponent diagnoses={diagnoses} patient={patient} />
      <Button variant="contained" color="primary">
        Add new entry
      </Button>
    </div>
  );
};

export default SinglePatient;
