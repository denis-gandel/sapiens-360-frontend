import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./";

import { UserProvider } from "../../../contexts";
import { SapiensLayoutProvider } from "../../../contexts/sapiens-layout/context";
import { SapiensLayout } from "../../../layouts";

export function SapiensRoutes() {
  return (
    <UserProvider>
      <SapiensLayoutProvider>
        <SapiensLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </SapiensLayout>
      </SapiensLayoutProvider>
    </UserProvider>
  )
}