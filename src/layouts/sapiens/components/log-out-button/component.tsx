import { useUserContext } from "../../../../contexts"
import "./style.css"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const LogOutButton = () => {

    const { logOut } = useUserContext()
    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
        navigate('/')
    }
    return (
        <button className="log-out-button" onClick={handleLogOut}>
            <LogOut />
        </button>
    )
}