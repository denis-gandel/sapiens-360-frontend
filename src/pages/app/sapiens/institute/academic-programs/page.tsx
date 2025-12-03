import "./style.css";

import { useEffect, useState } from "react";
import {
  useSapiensLayoutContext,
  useUserContext,
} from "../../../../../contexts";
import { Pagination, Table } from "reshaped";
import { AddButton } from "./components";
import { ProgramsService } from "../../../../../services";
import type { Program } from "../../../../../models";
import { ProgramCell } from "./components/program-cell/component";

export function AcademicPrograms() {
  const { setSubtitle, setIsLoading } = useSapiensLayoutContext();
  const { me } = useUserContext();

  const programsService = new ProgramsService();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const getPrograms = async () => {
    if (me) {
      const data = await programsService.index(page, 10, "name", "asc", {
        tenant_id: me.tenant_id ?? "",
      });
      setPrograms(data.items ?? []);
      setLastPage(data.lastPage ?? 0);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setSubtitle(
      <>
        Programas <span>académicos</span>
      </>
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPrograms();

    const interval = setInterval(() => {
      getPrograms();
    }, 5000);

    return () => clearInterval(interval);
  }, [me]);

  return (
    <div className="academics-programs-page">
      <div className="app-header">
        <AddButton />
      </div>
      <div className="app-body">
        <Table border columnBorder>
          <Table.Row highlighted>
            <Table.Heading>Nombre</Table.Heading>
            <Table.Heading>Codigo</Table.Heading>
          </Table.Row>
          {programs && programs.length > 0 ? (
            programs.map((program) => {
              return (
                <ProgramCell key={`program-${program.id}`} program={program} />
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={2}>
                Aún no hay programas. ¡Agrega uno nuevo para comenzar!
              </Table.Cell>
            </Table.Row>
          )}
        </Table>
        <Pagination
          total={lastPage}
          previousAriaLabel="Previous page"
          nextAriaLabel="Next page"
          pageAriaLabel={(args) => `Page ${args.page}`}
          onChange={(args) => setPage(args.page)}
        />
      </div>
    </div>
  );
}
