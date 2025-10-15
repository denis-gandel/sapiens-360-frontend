import { useEffect, useState } from "react"
import { useSapiensLayoutContext } from "../../../../../contexts/sapiens-layout/context"
import "./style.css"
import { Avatar, Button, Table } from "reshaped"
import { UserPlus, UserX } from "lucide-react"
import { UserService } from "../../../../../services"
import type { User } from "../../../../../models"
import { useUserContext } from "../../../../../contexts"

export function UsersManagment() {

  const [users, setUsers] = useState<User[]>([])

  const { setTitle, setSubtitle, setIsLoading } = useSapiensLayoutContext()
  const { me } = useUserContext()

  const userService = new UserService()

  const getUsers = async () => {
    if (me) {
      const response = await userService.getAllUsers(me.tenant_id ?? "")
      setUsers(response)
    }
  }

  const getInitials = (shortname: string) => {
    const parts = shortname.trim().split(" ");
    const initials = parts
      .filter(Boolean)
      .map(p => p[0].toUpperCase())
      .join("");
    return initials;
  }

  useEffect(() => {
    setIsLoading(true)
    setTitle(<>Usuarios</>)
    setSubtitle(<>Gestión de <span>usuarios</span></>)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getUsers()
  }, [me])

  return (
    <div className="users-management-page">
      <div className="ump-header">
        <Button icon={UserPlus} color="primary" rounded>Agregar usuario</Button>
        <Button icon={UserX} color="critical" rounded>Eliminar selección</Button>
      </div>
      <div className="ump-body">
        <Table border columnBorder>
          <Table.Row highlighted>
            <Table.Heading>Imagen</Table.Heading>
            <Table.Heading>Nombre</Table.Heading>
            <Table.Heading>Correo electrónico</Table.Heading>
            <Table.Heading>Teléfono</Table.Heading>
            <Table.Heading>Rol</Table.Heading>
          </Table.Row>
          {
            users.length > 0 ? (
              users.map(user => (
                <Table.Row key={`user-${user.id}`}>
                  <Table.Cell>
                    <Avatar size={8} src={user.image_url ?? ""} initials={getInitials(user.shortname)} />
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.phone}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role_id}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4}>Aún no hay usuarios. ¡Agrega uno nuevo para comenzar!</Table.Cell>
              </Table.Row>
            )
          }
        </Table>
      </div>
    </div>
  )
}