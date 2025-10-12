import { Route, Routes } from "react-router-dom";

import { AuthRoutes, RegistrationRoutes } from "./";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/registration/*" element={<RegistrationRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  )
}