interface CoursePart {
  name: string;
  exerciseCount: number;
}
interface ContentProps {
  content: CoursePart[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.content.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};
