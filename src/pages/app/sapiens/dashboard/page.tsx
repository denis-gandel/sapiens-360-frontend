import { useEffect } from "react"
import { useSapiensLayoutContext } from "../../../../contexts/sapiens-layout/context"
import "./style.css"
import { useUserContext } from "../../../../contexts"

export function Dashboard() {
  const { setTitle, setSubtitle, setIsLoading } = useSapiensLayoutContext()
  const { me } = useUserContext()

  useEffect(() => {
    if (me) {
      setTitle(<>¡Hola, <span>{me.shortname}</span>!</>)
      setSubtitle(<></>)
      setIsLoading(false)
    }
  }, [me])

  return (
    <div className="sapiens-dashboard-page">
    </div>
  )
}