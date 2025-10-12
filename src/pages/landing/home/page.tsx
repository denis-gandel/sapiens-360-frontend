import "./style.css"
import { Button } from "reshaped"
import Logo from "../../../assets/logo/full.png"
import { LogIn, University } from "lucide-react"

export function Home() {
  return (
    <div className="page-container">
      <main className="bg-lg full-section flex-c flex-cc cover-section-hp">
        <img src={Logo} alt="Sapiens360 logo" />
        <div className="cover-actions-hp flex-r flex-cc">
          <Button icon={University} color="primary" rounded href="/app/registration">Registrar instituto</Button>
          <Button icon={LogIn} rounded>Iniciar sesión</Button>
        </div>
      </main>
    </div>
  )
}