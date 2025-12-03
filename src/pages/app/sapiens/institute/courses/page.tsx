import { useEffect, useState } from "react";
import {
  useSapiensLayoutContext,
  useUserContext,
} from "../../../../../contexts";
import { Pagination, Table } from "reshaped";
import { AddButton, CourseCell } from "./components";
import { CoursesService } from "../../../../../services";
import type { Course } from "../../../../../models";

export function Courses() {
  const { setSubtitle, setIsLoading } = useSapiensLayoutContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const { me } = useUserContext();

  const coursesService = new CoursesService();

  useEffect(() => {
    setIsLoading(true);
    setSubtitle(
      <>
        Cursos <span>académicos</span>
      </>
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getCourses();
    const interval = setInterval(() => {
      getCourses();
    }, 5000);
    return () => clearInterval(interval);
  }, [me, page]);

  const getCourses = async () => {
    if (me) {
      const data = await coursesService.index(page, 10, "name", "asc", {
        tenant_id: me.tenant_id ?? "",
      });
      setCourses(data.items ?? []);
      setLastPage(data.lastPage ?? 0);
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
          {courses && courses.length > 0 ? (
            courses.map((course) => {
              return <CourseCell key={`course-${course.id}`} course={course} />;
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
