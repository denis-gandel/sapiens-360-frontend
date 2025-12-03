import { lazy, Suspense, useEffect } from "react";
import { useSapiensLayoutContext } from "../../../../contexts/sapiens-layout/context";
import { Route, Routes } from "react-router-dom";

// Lazy load components
const Subjects = lazy(() => import("./subjects/page").then(module => ({ default: module.Subjects })));

export function Lms() {
  const { setTitle } = useSapiensLayoutContext();

  useEffect(() => {
    setTitle(<>LMS</>);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/subjects" element={<Subjects />} />
      </Routes>
    </Suspense>
  );
}
