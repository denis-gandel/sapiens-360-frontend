import "./style.css"

import { UserX } from "lucide-react"
import { Button, Dismissible, Modal, Tooltip, useToggle, View } from "reshaped"

import type { User } from "../../../../../../../../models"
import { UserService } from "../../../../../../../../services"

interface Props {
  user: User
}

export const DeleteAction = ({ user }: Props) => {

  const { active, activate, deactivate } = useToggle(false);

  const userService = new UserService()

  const handleDelete = async () => {
    await userService.destroy(user.id ?? "")
    deactivate()
  }

  return (
    <>
      <Tooltip text="Eliminar usuario">
        {(attributes) => <Button attributes={attributes} icon={UserX} color="critical" onClick={activate} />}
      </Tooltip>
      <Modal active={active} onClose={deactivate} position="center">
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