import type { LucideIcon } from "lucide-react"
import "./style.css"

interface Props {
  text: string
  icon?: LucideIcon
  suffix?: string
}

export const ReadField = ({ text, icon: Icon, suffix }: Props) => {
  return (
    <div className="readfield-component w-full flex-r">
      {Icon && (
        <div className="flex-c flex-cc rfc-icon">
          <Icon size={16} className="rfc-i-svg" />
        </div>
      )}
      <div className="rfc-text w-full">{text}</div>
      {
        suffix && <div className="rfx-suffix flex-cc" style={{width: `${suffix.length}ch`}}>{suffix}</div>
      }
    </div>
  )
}
