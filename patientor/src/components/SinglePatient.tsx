import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Patient } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient(id!);
  }, [id]);

  if (!patient) return <div>Loading...</div>;
  const Icon =
    patient.gender === "male"
      ? MaleIcon
      : patient.gender === "female"
      ? FemaleIcon
      : AccessibilityIcon;
  console.log("logging patient in SinglePatient", patient);
  return (
    <div>
      <h1>Patientor</h1>
      <h2>
        {patient.name} <Icon />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default SinglePatient;
