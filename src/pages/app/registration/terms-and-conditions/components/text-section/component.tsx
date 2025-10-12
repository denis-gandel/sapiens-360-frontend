import "./style.css"
import type { ReactNode } from "react"

interface Props {
  number: number
  title: string
  children: ReactNode
}

export const TextSection = ({ number, title, children }: Props) => {
  return (
    <section className="text-tac-component">
      <h6><span>{number}.</span> {title}</h6>
      <div className="text-tac-section">
        {children}
      </div>
    </section>
  )
}