import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RegistrationLayout } from "../../../layouts";
import { RegistrationProvider } from "../../../contexts/registration/context";

// Lazy load components
const InstituteRegistration = lazy(() => import("./").then(module => ({ default: module.InstituteRegistration })));
const TermsAndConditions = lazy(() => import("./").then(module => ({ default: module.TermsAndConditions })));
const Principal = lazy(() => import("./").then(module => ({ default: module.Principal })));

export function RegistrationRoutes() {
  return (
    <RegistrationProvider>
      <RegistrationLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<InstituteRegistration />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/principal" element={<Principal />} />
          </Routes>
        </Suspense>
      </RegistrationLayout>
    </RegistrationProvider>
  )
}
