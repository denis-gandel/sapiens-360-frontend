import { Route, Routes } from "react-router-dom";

import { Dashboard, Lms } from "./";

import { UserProvider, SapiensLayoutProvider } from "../../../contexts";
import { SapiensLayout } from "../../../layouts";
import { UsersRoutes } from "./users";
import { InstituteRoutes } from "./institute";

export function SapiensRoutes() {
  return (
    <UserProvider>
      <SapiensLayoutProvider>
        <SapiensLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lms" element={<Lms />} />
            <Route path="/users/*" element={<UsersRoutes />} />
            <Route path="/institute/*" element={<InstituteRoutes />} />
          </Routes>
        </SapiensLayout>
      </SapiensLayoutProvider>
    </UserProvider>
  )
}