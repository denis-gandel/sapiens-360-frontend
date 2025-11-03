import "./style.css"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"

import type { RolePermissionsResponse } from "../../../../models"
import { ICONS } from "../../../../utils/sidebar/icons"
import { useLocation, useNavigate } from "react-router-dom"
import { SidebarMenu } from "../sidebar-menu/component"

interface Props {
  option: RolePermissionsResponse
}

export const SidebarOption = ({ option }: Props) => {
  const [Icon, setIcon] = useState<LucideIcon>()
  const [isSelected, setIsSelected] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const sidebarMenuRef = useRef<HTMLDivElement>(null)

  const handleGo = () => {
    if (option.subCategories && option.subCategories.length > 0) {
      setIsOpen(!isOpen)
    } else {
      navigate(`/app/sapiens${option.path}`)
    }
  }

  const verifySelection = () => {
    const path = location.pathname
    setIsSelected(path.includes(`/app/sapiens${option.path}`))
  }

  useEffect(() => {
    if (option?.path) {
      const foundIcon = ICONS.get(option.path)
      setIcon(foundIcon)
    }
  }, [option])

  useEffect(() => { verifySelection() }, [location])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarMenuRef.current && !sidebarMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={sidebarMenuRef} className="sidebar-option-wrapper">
      <button className={`sidebar-option-component ${isSelected ? 'soc-is-selected' : ''}`} onClick={handleGo}>
        {Icon && <Icon size={32} />}
      </button>
      {
        (isOpen && option.subCategories && option.subCategories.length > 0) && <SidebarMenu setIsOpen={setIsOpen} name={option.name ?? ""} parentPath={option.path ?? ""} options={option.subCategories} />}
    </div>
  )
}
