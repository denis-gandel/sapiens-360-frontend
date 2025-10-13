import { Route, Routes } from "react-router-dom";

import { AuthRoutes, RegistrationRoutes } from "./";
import { SapiensRoutes } from "./sapiens";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/registration/*" element={<RegistrationRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/sapiens/*" element={<SapiensRoutes />} />
    </Routes>
  )
}