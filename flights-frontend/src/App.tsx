import { useState, useEffect } from "react";
import { Diaries } from "./components/Diaries";
import { DiariesProps } from "./type";
import axios from "axios";
import { Form } from "./components/Form";

function App() {
  const [diaries, setDiaries] = useState<DiariesProps[]>([]);

  useEffect(() => {
    axios
      .get<DiariesProps[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      });
  }, []);
  console.log(diaries);
  return (
    <div>
      <h2>Add new entry</h2>
      <Form diaries={diaries} setDiaries={setDiaries} />
      <h2>Diary entries</h2>
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
