import { Table } from "reshaped";
import type { Course } from "../../../../../../../models";

interface Props {
  course: Course;
}

export const CourseCell = ({ course }: Props) => {
  return (
    <Table.Row>
      <Table.Cell>{course.name}</Table.Cell>
      <Table.Cell>{course.code}</Table.Cell>
    </Table.Row>
  );
};
