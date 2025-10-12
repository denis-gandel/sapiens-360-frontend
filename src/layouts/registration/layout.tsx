import type { ReactNode } from "react";

import "./style.css"

interface Props {
  children: ReactNode
}

export function RegistrationLayout({ children }: Readonly<Props>) {
  return (
    <div className="page-container layout-registration">
      <div className="cover-layout-registration bg-pl"></div>
      <div className="page-layout-registration">
        {children}
      </div>
    </div>
  )
}