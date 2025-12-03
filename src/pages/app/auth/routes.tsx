import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RegistrationLayout } from "../../../layouts";

// Lazy load components
const Login = lazy(() => import("./login/page").then(module => ({ default: module.Login })));

export function AuthRoutes() {
  return (
    <RegistrationLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </RegistrationLayout>
  )
}
