import { useState, useEffect } from "react";
import { DiariesProps } from "../type";
import axios from "axios";

export const Form = (props: {
  diaries: DiariesProps[];
  setDiaries: React.Dispatch<React.SetStateAction<DiariesProps[]>>;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const styles = {
    color: "red",
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      id: props.diaries.length + 1,
      date,
      weather,
      comment,
      visibility,
    };
    axios
      .post<DiariesProps>("http://localhost:3000/api/diaries", entryToAdd)
      .then((response) => {
        props.setDiaries((prevDiaries) => [...prevDiaries, response.data]);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("error.response", error.response?.request.response);
          setErrorMessage(error.response?.request.response);
        } else {
          console.error("Error adding diary entry:", error);
        }
      });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };
  return (
    <>
      <p style={styles}>{errorMessage}</p>
      <form onSubmit={entryCreation}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">Visibility:</label>
          <input
            type="text"
            id="visibility"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">Weather:</label>
          <input
            type="text"
            id="weather"
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};
