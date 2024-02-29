import { useState, SyntheticEvent } from "react";
import { HealthCheckRating, HealthCheckEntryFormValues } from "../types";
import { TextField, Grid, Button } from "@mui/material";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState<"HealthCheck">("HealthCheck");

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
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating.toString()}
          onChange={({ target }) =>
            setHealthCheckRating(parseInt(target.value))
          }
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes.join(", ")}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
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

export default HealthCheckAddEntryForm;
