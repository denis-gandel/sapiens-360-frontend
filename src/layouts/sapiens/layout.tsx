import "./style.css"

import type { ReactNode } from "react"

import { useSapiensLayoutContext } from "../../contexts/sapiens-layout/context"
import { Loader } from "reshaped"
import { Sidebar } from "./components"

interface Props {
  children: ReactNode
}

export function SapiensLayout({ children }: Readonly<Props>) {
  const { title, subtitle, isLoading } = useSapiensLayoutContext()

  return (
    <div className="sapiens-layout">
      {
        isLoading &&
        <div className="sapiens-loading">
          <Loader size="large" ariaLabel="Loading" />
        </div>
      }
      <aside className="sl-sidebar-container">
        <Sidebar />
      </aside>
      <div className="sl-content-container">
        <header className="slc-header">
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
        </header>
        <main className="slc-main">{children}</main>
      </div>
    </div>
  )
}