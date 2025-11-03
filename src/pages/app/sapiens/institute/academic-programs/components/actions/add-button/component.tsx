import { CaseSensitive, Plus } from "lucide-react"
import { useState } from "react"
import { Button, Dismissible, FormControl, Grid, Modal, NumberField, TextArea, TextField, useToggle, View } from "reshaped"

export const AddButton = () => {

  const { active, activate, deactivate } = useToggle()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [duration, setDuration] = useState(1)

  return (
    <>
      <Button icon={Plus} color="primary" onClick={activate} rounded>Agregar programa</Button>
      <Modal active={active} onClose={deactivate}>
        <Dismissible onClose={deactivate} closeAriaLabel="Close modal">
          <Modal.Title>Crear nuevo programa</Modal.Title>
        </Dismissible>
        <View paddingTop={5} align="center" gap={3} maxWidth="100%">
          <Grid columns={1} gap={4}>
            <FormControl required>
              <FormControl.Label>Nombre</FormControl.Label>
              <TextField name="name" onChange={(e) => setName(e.value)} placeholder="General" icon={CaseSensitive} value={name} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Descripción</FormControl.Label>
              <TextArea name="description" onChange={(e) => setDescription(e.value)} placeholder="Descripción..." value={description} resize="none" size="medium" />
            </FormControl>
            <FormControl required>
              <FormControl.Label>Código</FormControl.Label>
              <TextField name="code" onChange={(e) => setCode(e.value)} placeholder="SAPIENS-123" icon={CaseSensitive} value={code} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Duración</FormControl.Label>
              <NumberField name="duration" onChange={(e) => setDuration(e.value)} value={duration} increaseAriaLabel="Increase value"
                decreaseAriaLabel="Decrease value" min={1} max={12} />
            </FormControl>
          </Grid>
        </View>
      </Modal>
    </>
  )
}