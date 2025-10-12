import "./style.css"

import { AtSign, KeyRound } from 'lucide-react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, TextField } from "reshaped";

import { AuthenticationService } from "../../../../services";

export function Login() {
  const authenticationService: AuthenticationService = new AuthenticationService();

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await authenticationService.login(email, password)
    if (result) navigate('/app/dashboard')
  }

  return (
    <div className="login-container">
      <h1>Iniciar <span>sesión</span></h1>
      <div className="login-form-container flex-c">
        <FormControl>
          <FormControl.Label>Nombre:</FormControl.Label>
          <TextField
            name="name"
            onChange={(e) => setEmail(e.value)}
            placeholder="Colegio Sapiens360"
            icon={AtSign}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Contraseña:</FormControl.Label>
          <TextField
            name="password"
            onChange={(e) => setPassword(e.value)}
            placeholder="password123"
            icon={KeyRound}
            inputAttributes={{ type: "password" }}
          />
        </FormControl>
        <Button color="primary" rounded onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </div>
    </div>
  )
}