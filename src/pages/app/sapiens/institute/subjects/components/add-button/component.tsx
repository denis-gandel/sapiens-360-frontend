import { CaseSensitive, Plus } from "lucide-react";
import {
  Button,
  Dismissible,
  FormControl,
  Grid,
  Modal,
  NumberField,
  TextArea,
  TextField,
  useToggle,
  View,
} from "reshaped";
import { useState } from "react";
import { SubjectsService } from "../../../../../../../services";
import { useUserContext } from "../../../../../../../contexts";
import type { Subject } from "../../../../../../../models";

export const AddButton = () => {
  const { activate, active, deactivate } = useToggle();
  const { me } = useUserContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState(1);

  const subjectsService = new SubjectsService();

  const create = async () => {
    if (me) {
      const body: Subject = {
        name,
        description,
        code,
        credits,
        prerequisites: [],
        tenant_id: me.tenant_id ?? "",
      };
      subjectsService.store(body);
      deactivate();
    }
  };

  return (
    <>
      <Button icon={Plus} color="primary" onClick={activate} rounded>
        Agregar curso
      </Button>
      <Modal active={active} onClose={deactivate} position="end">
        <Dismissible onClose={deactivate} closeAriaLabel="Close modal">
          <Modal.Title>Crear nuevo curso</Modal.Title>
        </Dismissible>
        <View paddingTop={5} align="center" gap={3}>
          <Grid columns={1} gap={4} width="100%">
            <FormControl required>
              <FormControl.Label>Nombre</FormControl.Label>
              <TextField
                name="name"
                onChange={(e) => setName(e.value)}
                placeholder="General"
                icon={CaseSensitive}
                value={name}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Descripción</FormControl.Label>
              <TextArea
                name="description"
                onChange={(e) => setDescription(e.value)}
                placeholder="Descripción..."
                value={description}
                resize="none"
                size="medium"
              />
            </FormControl>
            <FormControl required>
              <FormControl.Label>Código</FormControl.Label>
              <TextField
                name="code"
                onChange={(e) => setCode(e.value)}
                placeholder="SAPIENS-123"
                icon={CaseSensitive}
                value={code}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Créditos</FormControl.Label>
              <NumberField
                name="credits"
                onChange={(e) => setCredits(e.value)}
                value={credits}
                increaseAriaLabel="Increase value"
                decreaseAriaLabel="Decrease value"
                min={1}
                max={12}
              />
            </FormControl>
          </Grid>
          <div className="veau-actions w-full flex-r flex-cb">
            <Button onClick={deactivate} rounded>
              Cancelar
            </Button>
            <Button onClick={create} color="primary" rounded>
              Crear
            </Button>
          </div>
        </View>
      </Modal>
    </>
  );
};
