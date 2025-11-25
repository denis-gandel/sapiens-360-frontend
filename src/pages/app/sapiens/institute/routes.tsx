import { Route, Routes } from "react-router-dom";
import { Institute } from "./";
import { useSapiensLayoutContext } from "../../../../contexts/sapiens-layout/context";
import { useEffect } from "react";
import { RegistrationProvider } from "../../../../contexts";
import { AcademicPrograms } from "./academic-programs";
import { Levels } from "./levels/page";
import { Courses } from "./courses/page";
import { Subjects } from "./subjects/page";

export function InstituteRoutes() {
  const { setTitle } = useSapiensLayoutContext();

  useEffect(() => {
    setTitle(<>Instituto</>);
  }, []);

  return (
    <RegistrationProvider>
      <Routes>
        <Route path="/" element={<Institute />} />
        <Route path="/academic-programs" element={<AcademicPrograms />} />
        <Route path="/academic-levels" element={<Levels />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/subjects" element={<Subjects />} />
      </Routes>
    </RegistrationProvider>
  );
}
