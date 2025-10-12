import { Route, Routes } from "react-router-dom";
import { InstituteRegistration, TermsAndConditions, Principal } from "./";
import { RegistrationLayout } from "../../../layouts";
import { RegistrationProvider } from "../../../contexts/registration/context";

export function RegistrationRoutes() {
  return (
    <RegistrationProvider>
      <RegistrationLayout>
        <Routes>
          <Route path="/" element={<InstituteRegistration />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/principal" element={<Principal />} />
        </Routes>
      </RegistrationLayout>
    </RegistrationProvider>
  )
}