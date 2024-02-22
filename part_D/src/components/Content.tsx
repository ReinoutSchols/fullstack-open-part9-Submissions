import { CoursePart } from "../type";
import { Part } from "./Part";

interface ContentProps {
  content: CoursePart[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      <Part courseParts={props.content} />
    </div>
  );
};
