import { useEffect } from "react"

import { useSapiensLayoutContext } from "../../../../contexts/sapiens-layout/context"
import { Route, Routes } from "react-router-dom"
import { UsersManagment } from "./management/page"

export function UsersRoutes() {
  const { setTitle } = useSapiensLayoutContext()

  useEffect(() => {
    setTitle(<>Usuarios</>)
  }, [])

  return (
    <Routes>
      <Route path="management" element={<UsersManagment />} />
    </Routes>
  )
}