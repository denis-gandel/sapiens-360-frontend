import { useEffect } from "react";
import { useSapiensLayoutContext } from "../../../../contexts/sapiens-layout/context";
import { Route, Routes } from "react-router-dom";
import { Subjects } from "./";

export function Lms() {
  const { setTitle } = useSapiensLayoutContext();

  useEffect(() => {
    setTitle(<>LMS</>);
  }, []);

  return (
    <Routes>
      <Route path="/subjects" element={<Subjects />} />
    </Routes>
  );
}
