import { useState, SyntheticEvent } from "react";
import { HealthCheckRating, HealthCheckEntryFormValues } from "../types";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { diagnosesData, HealthCheckRatingOptions } from "../utils";

interface Props {
  onCancel: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
}

const HealthCheckAddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type] = useState<"HealthCheck">("HealthCheck");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
      type,
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <h3>New HealthCheck entry</h3>
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
        <FormControl fullWidth>
          <InputLabel id="health-check-rating-label">
            Health Check Rating
          </InputLabel>
          <Select
            labelId="health-check-rating-label"
            value={healthCheckRating}
            onChange={(event) =>
              setHealthCheckRating(event.target.value as number)
            }
          >
            {HealthCheckRatingOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default HealthCheckAddEntryForm;
