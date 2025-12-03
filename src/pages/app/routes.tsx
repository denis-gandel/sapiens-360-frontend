import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "../../contexts";

// Lazy load route components
const AuthRoutes = lazy(() => import("./auth").then(module => ({ default: module.AuthRoutes })));
const RegistrationRoutes = lazy(() => import("./registration").then(module => ({ default: module.RegistrationRoutes })));
const SapiensRoutes = lazy(() => import("./sapiens").then(module => ({ default: module.SapiensRoutes })));

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/registration/*" element={<RegistrationRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/sapiens/*" element={<UserProvider><SapiensRoutes /></UserProvider>} />
      </Routes>
    </Suspense>
  )
}
