import { Route, Routes } from "react-router-dom";

import { Dashboard, Lms } from "./";

import { UserProvider } from "../../../contexts";
import { SapiensLayoutProvider } from "../../../contexts/sapiens-layout/context";
import { SapiensLayout } from "../../../layouts";
import { UsersRoutes } from "./users";

export function SapiensRoutes() {
  return (
    <UserProvider>
      <SapiensLayoutProvider>
        <SapiensLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lms" element={<Lms />} />
            <Route path="/users/*" element={<UsersRoutes />} />
          </Routes>
        </SapiensLayout>
      </SapiensLayoutProvider>
    </UserProvider>
  )
}