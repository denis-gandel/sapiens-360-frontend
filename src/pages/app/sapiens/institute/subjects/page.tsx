import { useEffect, useState } from "react";
import {
  useSapiensLayoutContext,
  useUserContext,
} from "../../../../../contexts";
import { Pagination, Table } from "reshaped";
import { AddButton, SubjectCell } from "./components";
import { SubjectsService } from "../../../../../services";
import type { Subject } from "../../../../../models";

export function Subjects() {
  const { setSubtitle, setIsLoading } = useSapiensLayoutContext();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const { me } = useUserContext();

  const subjectsService = new SubjectsService();

  useEffect(() => {
    setIsLoading(true);
    setSubtitle(
      <>
        Materias <span>académicas</span>
      </>
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getSubjects();
    const interval = setInterval(() => {
      getSubjects();
    }, 5000);
    return () => clearInterval(interval);
  }, [me, page]);

  const getSubjects = async () => {
    if (me) {
      const data = await subjectsService.index(page, 10, "name", "asc", {
        tenant_id: me.tenant_id ?? "",
      });
      setSubjects(data.data ?? []);
      setLastPage(data.last_page ?? 0);
    }
  };

  return (
    <div>
      <div className="app-header">
        <AddButton />
      </div>
      <div className="app-body">
        <Table border columnBorder>
          <Table.Row highlighted>
            <Table.Heading>Nombre</Table.Heading>
            <Table.Heading>Codigo</Table.Heading>
          </Table.Row>
          {subjects && subjects.length > 0 ? (
            subjects.map((subject) => {
              return <SubjectCell key={`subject-${subject.id}`} subject={subject} />;
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={2}>
                Aún no hay cursos. ¡Agrega uno nuevo para comenzar!
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
