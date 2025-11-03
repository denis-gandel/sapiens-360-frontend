import "./style.css"

import { BadgeAlert, Check, UserX, X } from "lucide-react"
import { Button, Dismissible, Modal, Tooltip, useToast, useToggle, View } from "reshaped"

import type { User } from "../../../../../../../../models"
import { UserService } from "../../../../../../../../services"

interface Props {
  user: User
}

export const DeleteAction = ({ user }: Props) => {

  const { active, activate, deactivate } = useToggle(false);
  const toast = useToast()

  const userService = new UserService()

  const handleDelete = async () => {
    const response = await userService.deleteUser(user.id ?? "")

    deactivate()

    if (response) {
      const id = toast.show({
        text: "Usuario eliminado con éxito",
        icon: Check,
        actionsSlot: <Button onClick={() => toast.hide(id)} color="positive"><X size={16} /></Button>,
        color: "positive",
      })
    } else {
      const id = toast.show({
        text: "Ocurrió un error. Inténtalo más tarde.",
        icon: BadgeAlert,
        actionsSlot: <Button onClick={() => toast.hide(id)} color="media"><X size={16} /></Button>,
        color: "warning",
      })
    }
  }

  return (
    <>
      <Tooltip text="Eliminar usuario">
        {(attributes) => <Button attributes={attributes} icon={UserX} color="critical" onClick={activate} />}
      </Tooltip>
      <Modal active={active} onClose={deactivate}>
        <Dismissible onClose={deactivate} closeAriaLabel="Close modal">
          <Modal.Title>¿Deseas eliminar este usuario?</Modal.Title>
        </Dismissible>
        <View paddingTop={5} align="center" gap={3}>
          <p>
            ¿Estás seguro de eliminar los usuarios seleccionados? Esta acción no se puede deshacer.
          </p>
          <div className="dam-actions">
            <Button rounded onClick={deactivate}>Cancelar</Button>
            <Button color="critical" onClick={handleDelete} rounded>Eliminar</Button>
          </div>
        </View>
      </Modal>
    </>
  )
}