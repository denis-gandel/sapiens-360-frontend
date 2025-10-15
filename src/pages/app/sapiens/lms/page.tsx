import { useEffect } from "react"
import { useSapiensLayoutContext } from "../../../../contexts/sapiens-layout/context"
import "./style.css"

export function Lms() {
  const { setTitle, setIsLoading } = useSapiensLayoutContext()

  useEffect(() => {
    setTitle(<>LMS</>)
    setIsLoading(false)
  }, [])

  return (
    <div className="sapiens-lms-page">
    </div>
  )
}