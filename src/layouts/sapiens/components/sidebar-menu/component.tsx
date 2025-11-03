import "./style.css"

import type { RolePermissionsResponse } from "../../../../models"
import { useNavigate } from "react-router-dom"
import type { Dispatch, SetStateAction } from "react"

interface Props {
  name: string
  parentPath: string
  options: RolePermissionsResponse[]
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const SidebarMenu = ({ name, parentPath, options, setIsOpen }: Props) => {

  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    setIsOpen(false)
    navigate(`/app/sapiens${parentPath}${path}`)
  }

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
                onClick={() => handleNavigate(option.path ?? "")}
              >
                {option.name}
              </button>))
          )
        }
      </div>
    </div>
  )
}