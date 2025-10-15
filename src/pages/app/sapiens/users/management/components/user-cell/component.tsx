import { UserPen, UserX } from "lucide-react"
import { Avatar, Button, Table, Tooltip } from "reshaped"

import type { Role, User } from "../../../../../../../models"
import { useUserContext } from "../../../../../../../contexts"

interface Props {
  user: User
  roles: Role[]
}

export const UserCell = ({ user, roles }: Props) => {

  const { me } = useUserContext()

  const getInitials = (shortname: string) => {
    const parts = shortname.trim().split(" ");
    const initials = parts
      .filter(Boolean)
      .map(p => p[0].toUpperCase())
      .join("");
    return initials;
  }

  return (
    <Table.Row>
      <Table.Cell verticalAlign="center" width={16}>
        <Avatar size={8} src={user.image_url ?? ""} initials={getInitials(user.shortname)} />
      </Table.Cell>
      <Table.Cell verticalAlign="center" minWidth={48}>{user.name}</Table.Cell>
      <Table.Cell verticalAlign="center" minWidth={32}>{user.email}</Table.Cell>
      <Table.Cell verticalAlign="center">
        {roles.find((r) => r.id === user.role_id)?.name ?? "Sin rol"}
      </Table.Cell>
      <Table.Cell verticalAlign="center" align="center">
        <div className="ump-table-cell-actions">
          {
            me?.id !== user.id && <Tooltip text="Eliminar usuario">
              {(attributes) => <Button attributes={attributes} icon={UserX} color="critical" />}
            </Tooltip>
          }
          <Tooltip text="Ver/Editar usuario">
            {(attributes) => <Button attributes={attributes} icon={UserPen} color="primary" />}
          </Tooltip>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}