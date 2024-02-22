import { CoursePart } from "../type";
interface PartProps {
  courseParts: CoursePart[];
}

export const Part = (props: PartProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={index}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>
                  <em>{part.description}</em>
                </p>
              </div>
            );
          case "group":
            return (
              <div key={index}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>Group Project Count: {part.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div key={index}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>
                  <em>{part.description}</em>
                </p>
                <p>Background Material: {part.backgroundMaterial}</p>
              </div>
            );
          case "special":
            return (
              <div key={index}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>
                  <em>{part.description}</em>
                </p>
                <p>
                  required skills:{" "}
                  {part.requirements.map((r, index) => (index ? ", " : "") + r)}
                </p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
