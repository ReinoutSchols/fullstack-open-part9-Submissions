import { useState, SyntheticEvent } from "react";
import { HospitalEntryFormValues, Discharge } from "../types";
import { diagnosesData } from "../utils";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
}

const HospitalAddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type] = useState<"Hospital">("Hospital");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      discharge,
      diagnosisCodes,
      type,
    });
  };

  return (
    <div style={{ marginTop: "4em" }}>
      <form onSubmit={addEntry}>
        <h3>New Hospital entry</h3>
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
        <div>
          <label>Discharge date</label>
          <br />
          <TextField
            fullWidth
            value={discharge.date}
            type="date"
            onChange={(event) =>
              setDischarge((prevDischarge) => ({
                ...prevDischarge,
                date: event.target.value,
              }))
            }
          />
        </div>
        <TextField
          label="Discharge Criteria"
          fullWidth
          value={discharge.criteria}
          onChange={(event) =>
            setDischarge((prevDischarge) => ({
              ...prevDischarge,
              criteria: event.target.value,
            }))
          }
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

export default HospitalAddEntryForm;
