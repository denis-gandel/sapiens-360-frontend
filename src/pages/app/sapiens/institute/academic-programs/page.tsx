import "./style.css"

import { useEffect } from "react";
import { useSapiensLayoutContext } from "../../../../../contexts";
import { Table } from "reshaped";
import { AddButton } from "./components";

export function AcademicPrograms() {
  const { setSubtitle, setIsLoading } = useSapiensLayoutContext()

  useEffect(() => {
    setSubtitle(<>Programas <span>académicos</span></>)
    setIsLoading(false)
  }, [])

  return (
    <div className="academics-programs-page">
      <div className="app-header">
        <AddButton />
      </div>
      <div className="app-body">
        <Table border columnBorder>
          <Table.Row highlighted>
            <Table.Heading>Heading 1</Table.Heading>
            <Table.Heading>Heading 2</Table.Heading>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell 1</Table.Cell>
            <Table.Cell>Cell 2</Table.Cell>
          </Table.Row>
        </Table>
      </div>
    </div>
  )
}