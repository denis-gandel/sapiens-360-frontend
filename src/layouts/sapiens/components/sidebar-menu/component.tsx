import "./style.css"

import type { RolePermissionsResponse } from "../../../../models"
import { useNavigate } from "react-router-dom"

interface Props {
  name: string
  parentPath: string
  options: RolePermissionsResponse[]
}

export const SidebarMenu = ({ name, parentPath, options }: Props) => {

  const navigate = useNavigate()

  return (
    <div className="sidebar-menu-component">
      <h3>{name}</h3>
      <div className="smc-options">
        {
          options.length > 0 && (
            options.map(option => (
              <button
                className="smc-option"
                key={`sidebar-menu-option-${option.id}`}
                onClick={() => navigate(`/app/sapiens${parentPath}${option.path}`)}
              >
                {option.name}
              </button>))
          )
        }
      </div>
    </div>
  )
}