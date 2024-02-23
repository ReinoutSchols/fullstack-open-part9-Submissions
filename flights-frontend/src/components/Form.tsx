import { useState, useEffect } from "react";
import { DiariesProps, Visibility, Weather } from "../type";
import axios from "axios";

export const Form = (props: {
  diaries: DiariesProps[];
  setDiaries: React.Dispatch<React.SetStateAction<DiariesProps[]>>;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
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
    // setVisibility("");
    // setWeather("");
    setComment("");
  };
  return (
    <>
      <p style={styles}>{errorMessage}</p>
      <form onSubmit={entryCreation}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <fieldset>
          <legend>Visibility:</legend>
          <label>great</label>
          <input
            type="radio"
            value="great"
            onChange={(event) =>
              setVisibility(event.target.value as Visibility)
            }
            name="visibility"
            checked={visibility === "great"}
          />
          <label>good</label>
          <input
            type="radio"
            value="good"
            onChange={(event) =>
              setVisibility(event.target.value as Visibility)
            }
            name="visibility"
            checked={visibility === "good"}
          />
          <label>ok</label>
          <input
            type="radio"
            value="ok"
            onChange={(event) =>
              setVisibility(event.target.value as Visibility)
            }
            name="visibility"
            checked={visibility === "ok"}
          />
          <label>poor</label>
          <input
            type="radio"
            value="poor"
            onChange={(event) =>
              setVisibility(event.target.value as Visibility)
            }
            name="visibility"
            checked={visibility === "poor"}
          />
        </fieldset>
        <fieldset>
          <legend>Weather:</legend>
          <label>sunny</label>
          <input
            type="radio"
            value="sunny"
            onChange={(event) => setWeather(event.target.value as Weather)}
            name="weather"
            checked={weather === "sunny"}
          />
          <label>rainy</label>
          <input
            type="radio"
            value="rainy"
            onChange={(event) => setWeather(event.target.value as Weather)}
            name="rainy"
            checked={weather === "rainy"}
          />
          <label>cloudy</label>
          <input
            type="radio"
            value="cloudy"
            onChange={(event) => setWeather(event.target.value as Weather)}
            name="weather"
            checked={weather === "cloudy"}
          />
          <label>stormy</label>
          <input
            type="radio"
            value="stormy"
            onChange={(event) => setWeather(event.target.value as Weather)}
            name="weather"
            checked={weather === "stormy"}
          />
          <label>windy</label>
          <input
            type="radio"
            value="windy"
            onChange={(event) => setWeather(event.target.value as Weather)}
            name="weather"
            checked={weather === "windy"}
          />
        </fieldset>
        <div>
          <label>Comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};
