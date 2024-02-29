import { useState, SyntheticEvent } from "react";
import { OccupationalHealthcareEntryForm, sickLeave } from "../types";
import { TextField, Grid, Button } from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: (values: OccupationalHealthcareEntryForm) => void;
}

const OccupationalHealthcareAddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type] = useState<"OccupationalHealthcare">("OccupationalHealthcare");

  const [sickLeaveState, setSickLeave] = useState<sickLeave>({
    startDate: "",
    endDate: "",
  });

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      employerName,
      diagnosisCodes,
      type,
      sickLeave: sickLeaveState,
    });
  };

  return (
    <div style={{ marginTop: "4em" }}>
      <form onSubmit={addEntry}>
        <h3> New Occupational entry </h3>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes.join(", ")}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
        />
        <TextField
          label="sickleave Start"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={sickLeaveState.startDate}
          onChange={(event) =>
            setSickLeave((prevSickLeave) => ({
              ...prevSickLeave,
              startDate: event.target.value,
            }))
          }
        />
        <TextField
          label="sickLeave End"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={sickLeaveState.endDate}
          onChange={(event) =>
            setSickLeave((prevSickLeave) => ({
              ...prevSickLeave,
              endDate: event.target.value,
            }))
          }
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left", marginTop: "5px" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
                marginTop: "5px",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default OccupationalHealthcareAddEntryForm;
