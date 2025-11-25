import { Table } from "reshaped";
import type { Level } from "../../../../../../../models";

interface Props {
  level: Level;
}

export const LevelCell = ({ level }: Props) => {
  return (
    <Table.Row>
      <Table.Cell>{level.name}</Table.Cell>
      <Table.Cell>{level.code}</Table.Cell>
    </Table.Row>
  );
};
