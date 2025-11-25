import { CaseSensitive, Plus, Shapes } from "lucide-react";
import {
  Button,
  Dismissible,
  FormControl,
  Grid,
  Modal,
  NumberField,
  Select,
  TextArea,
  TextField,
  useToggle,
  View,
} from "reshaped";
import { useEffect, useState } from "react";
import { CoursesService, ProgramsService } from "../../../../../../../services";
import { useUserContext } from "../../../../../../../contexts";
import type { Course, Program } from "../../../../../../../models";

type SelectType = { label: string; value: string };

export const AddButton = () => {
  const { activate, active, deactivate } = useToggle();
  const { me } = useUserContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [period, setPeriod] = useState(1);
  const [programId, setProgramId] = useState("");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [options, setOptions] = useState<SelectType[]>([]);

  const coursesService = new CoursesService();
  const programsService = new ProgramsService();

  const create = async () => {
    if (me) {
      const body: Course = {
        name,
        description,
        code,
        period,
        program_id: programId,
        subjects: [],
        tenant_id: me.tenant_id ?? "",
      };
      coursesService.store(body);
      deactivate();
    }
  };

  const getPrograms = async () => {
    if (me) {
      const data = await programsService.index(
        undefined,
        undefined,
        "name",
        "asc",
        {
          tenant_id: me.tenant_id ?? "",
        }
      );
      setPrograms(data ?? []);
    }
  };

  const getOptions = () => {
    if (programs && programs.length > 0) {
      const options: SelectType[] = programs.map((program) => ({
        label: program.name ?? "",
        value: program.id ?? "",
      }));
      setOptions(options);
    }
  };

  useEffect(() => {
    getPrograms();
  }, [me]);

  useEffect(() => {
    getOptions();
  }, [me, programs]);

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
              <FormControl.Label>Periodo</FormControl.Label>
              <NumberField
                name="period"
                onChange={(e) => setPeriod(e.value)}
                value={period}
                increaseAriaLabel="Increase value"
                decreaseAriaLabel="Decrease value"
                min={1}
                max={12}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Programa:</FormControl.Label>
              <Select
                name="program_id"
                placeholder="Selecciona un programa"
                options={options}
                onChange={(e) => setProgramId(e.value)}
                icon={Shapes}
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
