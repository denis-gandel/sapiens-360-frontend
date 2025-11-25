import './style.css'

import { useUserContext } from "../../../../contexts"

import SmallLogo from '../../../../assets/logo/Small.png'
import { SidebarOption } from '../sidebar-option/component'
import { LogOutButton } from '../log-out-button/component'

export const Sidebar = () => {
  const { permissions } = useUserContext()

  return (
    <div className="sidebar-component">
      <img src={SmallLogo} alt="Sapiens360 logo" className='sc-pages-logo' />
      <div className="sc-options">
        <SidebarOption option={
          {
            name: 'Inicio',
            path: '/dashboard',
            code: 'DASHBOARD_PAGE',
            permissions: [],
            subCategories: []
          }
        } />
        <SidebarOption option={
          {
            name: 'Perfil',
            path: '/profile',
            code: 'PROFILE_PAGE',
            permissions: [],
            subCategories: []
          }
        } />
        {
          permissions.map((permission) => {
            return <SidebarOption key={`sidebar-option-${permission.id}`} option={permission} />
          })
        }
        <LogOutButton />
      </div>
    </div>
  )
}