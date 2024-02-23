import { useState, useEffect } from "react";
import { Diaries } from "./components/Diaries";
import { DiariesProps } from "./type";
import axios from "axios";

function App() {
  const [newEntry, setNewEntry] = useState("");
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
      <h2>Diary entries</h2>
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
