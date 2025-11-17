import {
  useEffect,
  useState
} from "react"
import { useSapiensLayoutContext } from "../../../../../contexts/sapiens-layout/context"
import "./style.css"
import {
  Pagination,
  ScrollArea,
  Table
} from "reshaped"
import {
  RolesService,
  UserService
} from "../../../../../services"
import type {
  Role,
  User
} from "../../../../../models"
import { useUserContext } from "../../../../../contexts"
import { UserCell } from "./components/user-cell/component"
import { UserCreateAction } from "./components"
import { VerifyPermission } from "../../../../../components/general/permissions/verify-permission/component"

export function UsersManagment() {

  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)

  const { setTitle, setSubtitle, setIsLoading } = useSapiensLayoutContext()
  const { me } = useUserContext()

  const userService = new UserService()
  const rolesService = new RolesService()

  const getUsers = async () => {
    if (me) {
      const users = await userService.index(page, 10, "", "asc", { tenant_id: me.tenant_id ?? "", })
      setUsers(users)
      setLastPage(100)
    }
  }

  const getRoles = async () => {
    const response = await rolesService.index()
    setRoles(response)
  }

  useEffect(() => {
    setIsLoading(true)
    setTitle(<>Usuarios</>)
    setSubtitle(<>Gestión de <span>usuarios</span></>)
    getRoles()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getUsers()
  }, [me, page])

  return (
    <div className="users-management-page">
      <div className="ump-header">
        <VerifyPermission permission="CREATE_USERS">
          <UserCreateAction />
        </VerifyPermission>
        {/* <Button icon={UserX} color="critical" rounded>Eliminar selección</Button> */}
      </div>
      <div className="ump-body">
        <ScrollArea height="656px" scrollbarDisplay="visible">
          <Table border>
            <Table.Row highlighted>
              <Table.Heading></Table.Heading>
              <Table.Heading>Nombre</Table.Heading>
              <Table.Heading>Correo electrónico</Table.Heading>
              <Table.Heading>Rol</Table.Heading>
              <Table.Heading></Table.Heading>
            </Table.Row>
            {
              users.length > 0 ? (
                users.map(user => (
                  <UserCell user={user} roles={roles} key={`user-${user.id}`} />
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5}>Aún no hay usuarios. ¡Agrega uno nuevo para comenzar!</Table.Cell>
                </Table.Row>
              )
            }
          </Table>
        </ScrollArea>
        <Pagination
          total={lastPage}
          previousAriaLabel="Previous page"
          nextAriaLabel="Next page"
          pageAriaLabel={(args) => `Page ${args.page}`}
          onChange={(args) => setPage(args.page)}
        />
      </div>
    </div>
  )
}