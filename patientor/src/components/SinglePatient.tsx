import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import {
  Diagnosis,
  HealthCheckEntryFormValues,
  HospitalEntryFormValues,
  OccupationalHealthcareEntryForm,
  Patient,
} from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import EntriesComponent from "./EntriesComponent";
import Button from "@mui/material/Button";
import HealthCheckAddEntryFormfrom from "./HealthCheckAddEntryForm";
import OccupationalHealthcareAddEntryForm from "./OccupationalHealthcareEntryForm";
import axios from "axios";
import HospitalAddEntryForm from "./HospitalEntryForm";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const openForm = () => setOpen(true);

  const params = useParams<{ id: string }>();
  const id = params.id || "";

  const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
    try {
      const updatedPatient = await patientService.createEntry(values, id);
      setPatient(updatedPatient);
      setOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  const submitNewEntryOccupational = async (
    values: OccupationalHealthcareEntryForm
  ) => {
    try {
      const updatedPatient = await patientService.createEntryOccupational(
        values,
        id
      );
      setPatient(updatedPatient);
      setOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  const submitNewEntryHospital = async (values: HospitalEntryFormValues) => {
    try {
      const updatedPatient = await patientService.createEntryHospital(
        values,
        id
      );
      setPatient(updatedPatient);
      setOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

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
      <br></br> <p>occupation: {patient.occupation}</p>
      <Button variant="contained" color="primary" onClick={openForm}>
        Add new entry
      </Button>
      <div
        style={{
          margin: "0.3em",
        }}
      >
        <h3 style={{ color: "red" }}>{error}</h3>
        {open && (
          <>
            <HealthCheckAddEntryFormfrom
              onCancel={() => setOpen(false)}
              onSubmit={submitNewEntry}
            />
            <OccupationalHealthcareAddEntryForm
              onCancel={() => setOpen(false)}
              onSubmit={submitNewEntryOccupational}
            />
            <HospitalAddEntryForm
              onCancel={() => setOpen(false)}
              onSubmit={submitNewEntryHospital}
            />
          </>
        )}
      </div>
      <br />
      <h2>entries</h2>
      <EntriesComponent diagnoses={diagnoses} patient={patient} />
    </div>
  );
};

export default SinglePatient;
