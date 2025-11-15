import { Route, Routes, useNavigate } from "react-router-dom";

import { Dashboard, Lms } from "./";

import { SapiensLayoutProvider, useUserContext } from "../../../contexts";
import { SapiensLayout } from "../../../layouts";
import { UsersRoutes } from "./users";
import { InstituteRoutes } from "./institute";
import { useEffect } from "react";
import { Button, useToast } from "reshaped";
import { BadgeAlert, X } from "lucide-react";

export function SapiensRoutes() {

  const { me, jwt, permissions } = useUserContext()
  const toast = useToast()
  const navigate = useNavigate()

  const verifyLogin = () => {
    if (!jwt && !me && !permissions) {
      const id = toast.show({
        text: "Por favor, inicia sesión para continuar.",
        icon: BadgeAlert,
        actionsSlot: <Button onClick={() => toast.hide(id)} color="media"><X size={16} /></Button>,
        color: "warning",
      })
      navigate('/app/auth/login')
    }
  }

  useEffect(() => {
    verifyLogin();
  }, [jwt, me, permissions]);

  return (
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
  )
}