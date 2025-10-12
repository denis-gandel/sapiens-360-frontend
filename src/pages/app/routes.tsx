import { Route, Routes } from "react-router-dom";
import { RegistrationRoutes } from "./";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/registration/*" element={<RegistrationRoutes />} />
    </Routes>
  )
}