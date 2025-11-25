import { useEffect, useState } from "react";
import {
  useSapiensLayoutContext,
  useUserContext,
} from "../../../../../contexts";
import { Pagination, Table } from "reshaped";
import { AddButton, LevelCell } from "./components";
import { LevelsService } from "../../../../../services";
import type { Level } from "../../../../../models";

export function Levels() {
  const { setSubtitle, setIsLoading } = useSapiensLayoutContext();
  const [levels, setLevels] = useState<Level[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const { me } = useUserContext();

  const levelsService = new LevelsService();

  useEffect(() => {
    setIsLoading(true);
    setSubtitle(
      <>
        Niveles <span>académicos</span>
      </>
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getLevels();
    const interval = setInterval(() => {
      getLevels();
    }, 5000);
    return () => clearInterval(interval);
  }, [me, page]);

  const getLevels = async () => {
    if (me) {
      const data = await levelsService.index(page, 10, "name", "asc", {
        tenant_id: me.tenant_id ?? "",
      });
      setLevels(data.data ?? []);
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
          {levels && levels.length > 0 ? (
            levels.map((level) => {
              return <LevelCell key={`level-${level.id}`} level={level} />;
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={2}>
                Aún no hay niveles. ¡Agrega uno nuevo para comenzar!
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
