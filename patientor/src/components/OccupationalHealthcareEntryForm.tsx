import { useState, SyntheticEvent } from "react";
import { OccupationalHealthcareEntryForm, sickLeave } from "../types";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { diagnosesData } from "../utils";

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
  console.log("sickleavstart & sickleaveend:", sickLeaveState);
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
        <div>
          <label>Current date</label>
          <br />
          <TextField
            fullWidth
            value={date}
            type="date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
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
        <FormControl fullWidth>
          <InputLabel id="DiagnosisCodes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="DiagnosisCodes-label"
            multiple
            value={diagnosisCodes}
            onChange={(event) => {
              const selectedCodes = event.target.value as string[];
              setDiagnosisCodes(selectedCodes);
            }}
          >
            {diagnosesData.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <label>Sick Leave Start</label>
          <br />
          <TextField
            fullWidth
            type="date"
            value={sickLeaveState.startDate}
            onChange={(event) =>
              setSickLeave((prevSickLeave) => ({
                ...prevSickLeave,
                startDate: event.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Sick Leave End</label>
          <br />
          <TextField
            fullWidth
            type="date"
            value={sickLeaveState.endDate}
            onChange={(event) =>
              setSickLeave((prevSickLeave) => ({
                ...prevSickLeave,
                endDate: event.target.value,
              }))
            }
          />
        </div>
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
