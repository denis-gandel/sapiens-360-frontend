import { Table } from "reshaped"

import type { Program } from "../../../../../../../models"

interface Props {
  program: Program
}

export const ProgramCell = ({ program }: Props) => {
  return (
    <Table.Row>
      <Table.Cell verticalAlign="center">{program.name}</Table.Cell>
      <Table.Cell verticalAlign="center">{program.code}</Table.Cell>
    </Table.Row>
  )
}