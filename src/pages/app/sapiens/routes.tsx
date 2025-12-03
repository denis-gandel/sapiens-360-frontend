import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, useToast } from "reshaped";
import { BadgeAlert, X } from "lucide-react";

import { SapiensLayoutProvider, useUserContext } from "../../../contexts";
import { SapiensLayout } from "../../../layouts";

// Lazy load components
const Dashboard = lazy(() => import("./dashboard").then(module => ({ default: module.Dashboard })));
const Lms = lazy(() => import("./lms").then(module => ({ default: module.Lms })));
const UsersRoutes = lazy(() => import("./users").then(module => ({ default: module.UsersRoutes })));
const InstituteRoutes = lazy(() => import("./institute").then(module => ({ default: module.InstituteRoutes })));
const Profile = lazy(() => import("./profile/page").then(module => ({ default: module.Profile })));

export function SapiensRoutes() {
  const { me, jwt, permissions } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();

  const verifyLogin = () => {
    if (!jwt && !me && !permissions) {
      const id = toast.show({
        text: "Por favor, inicia sesión para continuar.",
        icon: BadgeAlert,
        actionsSlot: (
          <Button onClick={() => toast.hide(id)} color="media">
            <X size={16} />
          </Button>
        ),
        color: "warning",
      });
      navigate("/app/auth/login");
    }
  };

  useEffect(() => {
    verifyLogin();
  }, [jwt, me, permissions]);

  return (
    <SapiensLayoutProvider>
      <SapiensLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lms/*" element={<Lms />} />
            <Route path="/users/*" element={<UsersRoutes />} />
            <Route path="/institute/*" element={<InstituteRoutes />} />
          </Routes>
        </Suspense>
      </SapiensLayout>
    </SapiensLayoutProvider>
  );
}
