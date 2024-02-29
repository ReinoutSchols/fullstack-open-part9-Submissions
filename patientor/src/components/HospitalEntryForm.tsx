import { useState, SyntheticEvent } from "react";
import { HospitalEntryFormValues, Discharge } from "../types";
import { TextField, Grid, Button } from "@mui/material";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          label="Discharge Date"
          fullWidth
          value={discharge.date}
          onChange={(event) =>
            setDischarge((prevDischarge) => ({
              ...prevDischarge,
              date: event.target.value,
            }))
          }
        />
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

export default HospitalAddEntryForm;
