import { Table } from "reshaped";
import type { Subject } from "../../../../../../../models";

interface Props {
  subject: Subject;
}

export const SubjectCell = ({ subject }: Props) => {
  return (
    <Table.Row>
      <Table.Cell>{subject.name}</Table.Cell>
      <Table.Cell>{subject.code}</Table.Cell>
    </Table.Row>
  );
};
