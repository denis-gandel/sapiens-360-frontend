import { CaseSensitive, Plus, Shapes } from "lucide-react";
import {
  Button,
  Dismissible,
  FormControl,
  Grid,
  Modal,
  Select,
  TextField,
  useToggle,
  View,
} from "reshaped";
import { useEffect, useState } from "react";
import { SubjectsService, UserService } from "../../../../../../../services";
import { useUserContext } from "../../../../../../../contexts";
import type { Subject, SubjectLms, User } from "../../../../../../../models";
import { SubjectsLmsService } from "../../../../../../../services/concretes/lms/subjects-lms.service";

type SelectType = { label: string; value: string };

export const AddButton = () => {
  const { activate, active, deactivate } = useToggle();
  const { me } = useUserContext();

  const [name, setName] = useState("");
  const [teachers, setTeachers] = useState<User[]>([]);
  const [teacherOptions, setteacherOptions] = useState<SelectType[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<SelectType[]>([]);
  const [selectedsubject, setSelectedsubject] = useState<string>("");

  const subjectsService = new SubjectsService();
  const usersService = new UserService();
  const subjectsLmsService = new SubjectsLmsService();

  const create = async () => {
    if (me) {
      const body: SubjectLms = {
        name,
        cover_url: "",
        subject_id: selectedsubject,
        teacher_id: selectedTeacher,
        tenant_id: me.tenant_id ?? "",
      };
      console.log(body);
      subjectsLmsService.store(body);
      deactivate();
    }
  };

  const getTeachers = async () => {
    if (me) {
      const data = await usersService.index(
        undefined,
        undefined,
        "name",
        "asc",
        {
          tenant_id: me.tenant_id ?? "",
          role_id: 2,
        }
      );
      setTeachers(data.items ?? []);
    }
  };

  const getSubjects = async () => {
    if (me) {
      const data = await subjectsService.index(
        undefined,
        undefined,
        "name",
        "asc",
        {
          tenant_id: me.tenant_id ?? "",
        }
      );
      setSubjects(data.items ?? []);
    }
  };

  const getTeachersOptions = () => {
    if (teachers && teachers.length > 0) {
      const options: SelectType[] = teachers.map((teacher) => ({
        label: teacher.name ?? "",
        value: teacher.id ?? "",
      }));
      setteacherOptions(options);
    }
  };

  const getSubjectsOptions = () => {
    if (subjects && subjects.length > 0) {
      const options: SelectType[] = subjects.map((subject) => ({
        label: subject.name ?? "",
        value: subject.id ?? "",
      }));
      setSubjectOptions(options);
    }
  };

  useEffect(() => {
    getTeachers();
    getSubjects();
  }, [me]);

  useEffect(() => {
    getTeachersOptions();
    getSubjectsOptions();
  }, [me, teachers, subjects]);

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
              <FormControl.Label>Profesor:</FormControl.Label>
              <Select
                name="teacher_id"
                placeholder="Selecciona un profesor"
                options={teacherOptions}
                onChange={(e) => setSelectedTeacher(e.value)}
                icon={Shapes}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Curso:</FormControl.Label>
              <Select
                name="subject_id"
                placeholder="Selecciona un curso"
                options={subjectOptions}
                onChange={(e) => setSelectedsubject(e.value)}
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
