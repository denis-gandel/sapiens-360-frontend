import { Route, Routes } from "react-router-dom";
import { Login } from "./login/page";
import { RegistrationLayout } from "../../../layouts";

export function AuthRoutes() {
  return (
    <RegistrationLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </RegistrationLayout>
  )
}