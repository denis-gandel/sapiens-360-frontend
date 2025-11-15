import { Route, Routes } from "react-router-dom";

import { AuthRoutes, RegistrationRoutes } from "./";
import { SapiensRoutes } from "./sapiens";
import { UserProvider } from "../../contexts";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/registration/*" element={<RegistrationRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/sapiens/*" element={<UserProvider><SapiensRoutes /></UserProvider>} />
    </Routes>
  )
}