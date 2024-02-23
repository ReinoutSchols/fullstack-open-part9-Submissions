import { DiariesProps } from "../type";

export const Diaries = (props: { diaries: DiariesProps[] }) => {
  return (
    <div>
      {props.diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          weather: {diary.weather}
          <br></br>
          visibility: {diary.visibility}
          <p>{diary.comment}</p>
        </div>
      ))}
    </div>
  );
};
