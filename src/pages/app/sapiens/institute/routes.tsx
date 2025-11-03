import { Route, Routes } from "react-router-dom";
import { Institute } from "./";
import { useSapiensLayoutContext } from "../../../../contexts/sapiens-layout/context";
import { useEffect } from "react";
import { RegistrationProvider } from "../../../../contexts";
import { AcademicPrograms } from "./academic-programs";

export function InstituteRoutes() {

  const { setTitle } = useSapiensLayoutContext()

  useEffect(() => {
    setTitle(<>Instituto</>)
  }, [])

  return (
    <RegistrationProvider>
      <Routes>
        <Route path="/" element={<Institute />} />
        <Route path="/academic-programs" element={<AcademicPrograms />} />
      </Routes>
    </RegistrationProvider>
  )
}