import { useEffect, useState } from "react";
import {
  useSapiensLayoutContext,
  useUserContext,
} from "../../../../../contexts";
import type { SubjectLms } from "../../../../../models";
import { SubjectsLmsService } from "../../../../../services/concretes/lms/subjects-lms.service";
import { AddButton, CourseCard } from "./components";
import { Grid, Pagination, View } from "reshaped";

export function Subjects() {
  const { me } = useUserContext();
  const { setSubtitle, setIsLoading } = useSapiensLayoutContext();

  const subjectsLmsService = new SubjectsLmsService();

  const [subjects, setSubjects] = useState<SubjectLms[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getSubjects = async () => {
    if (me) {
      const response = await subjectsLmsService.index(page, 10, "name", "asc", {
        tenant_id: me?.tenant_id ?? "",
        is_active: true,
      });
      setSubjects(response.items);
      setTotalPages(response.lastPage);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setSubtitle("Cursos");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getSubjects();
    }, 5000);
    return () => clearInterval(interval);
  }, [me]);

  return (
    <>
      <div className="lms-subjects-header flex-r flex-cc">
        <AddButton />
      </div>
      <div>
        {subjects && subjects.length > 0 ? (
          <View>
            <Grid columns={{ s: 1, l: 2 }} gap={10}>
              {subjects.map((subject) => (
                <CourseCard key={subject.id} course={subject} />
              ))}
            </Grid>
            <Pagination
              total={totalPages}
              previousAriaLabel="Previous page"
              nextAriaLabel="Next page"
              pageAriaLabel={(args) => `Page ${args.page}`}
              onChange={(args) => setPage(args.page)}
            />
          </View>
        ) : (
          <p>No hay cursos</p>
        )}
      </div>
    </>
  );
}
