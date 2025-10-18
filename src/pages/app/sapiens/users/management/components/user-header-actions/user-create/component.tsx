import {
  AtSign,
  BadgeAlert,
  Cake,
  CaseSensitive,
  Check,
  IdCard,
  KeyRound,
  MapPin,
  Phone,
  Shield,
  UserPlus,
  VenusAndMars,
  X
} from "lucide-react"
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction
} from "react";
import {
  Button,
  Calendar,
  Dismissible,
  FormControl,
  Grid,
  Modal,
  Popover,
  Select,
  TextField,
  useToast,
  useToggle,
  View
} from "reshaped"
import { AuthorizationService, UserService } from "../../../../../../../../services";
import type { User } from "../../../../../../../../models";
import { useUserContext } from "../../../../../../../../contexts";

export const UserCreateAction = () => {

  const [role, setRole] = useState<string>("");
  const [firstnames, setFirstnames] = useState("");
  const [lastnames, setLastnames] = useState("");
  const [ci, setCi] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<"M" | "F">("M");
  const [birthdate, setBirthdate] = useState<Date>(new Date());

  const [roles, setRoles] = useState<{
    label: string;
    value: string;
  }[]>([])

  const { active, activate, deactivate } = useToggle(false);
  const toast = useToast()
  const { me } = useUserContext()

  const MIN_AGE = 4;
  const MAX_AGE = 65;

  const userService = new UserService()
  const today = new Date();
  const authorizationService = new AuthorizationService()

  const minDate = new Date(today.getFullYear() - MAX_AGE, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());

  const toggle = useToggle();

  const genders = [
    {
      label: "Masculino",
      value: "M"
    },
    {
      label: "Femenino",
      value: "F"
    }
  ]

  const changeValue = (value: any, setValue: Dispatch<SetStateAction<any>>) => setValue(value)

  const handleCreate = async () => {
    const data: User = {
      firstnames,
      lastnames,
      ci,
      address,
      phone,
      email,
      password,
      role_id: Number.parseInt(role),
      gender,
      birthdate,
      tenant_id: me?.tenant_id
    }

    const response = await userService.createUser(data)

    if (response) {
      deactivate()
      const id = toast.show({
        text: "Usuario creado con éxito",
        icon: Check,
        actionsSlot: <Button onClick={() => toast.hide(id)} color="positive"><X size={16} /></Button>,
        color: "positive",
      })
    } else {
      deactivate()
      const id = toast.show({
        text: "Ocurrió un error. Inténtalo más tarde.",
        icon: BadgeAlert,
        actionsSlot: <Button onClick={() => toast.hide(id)} color="media"><X size={16} /></Button>,
        color: "warning",
      })
    }
  }

  const getRoles = async () => {
    const response = await authorizationService.getRoles()

    const result = response.map((role) => {
      return { label: role.name, value: `${role.id}` }
    })

    setRoles(result)
  }

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <>
      <Button icon={UserPlus} color="primary" onClick={activate} rounded>Agregar usuario</Button>
      <Modal active={active} onClose={deactivate}>
        <Dismissible onClose={deactivate} closeAriaLabel="Close modal">
          <Modal.Title>Crear nuevo usuario</Modal.Title>
        </Dismissible>
        <View paddingTop={5} align="center" gap={3} maxWidth="100%">
          <Grid columns={1}>
            <FormControl>
              <FormControl.Label>Rol:</FormControl.Label>
              <Select name="role" placeholder="Elige una opción" options={roles} onChange={(e) => changeValue(e.value, setRole)} icon={Shield} value={role} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Nombres:</FormControl.Label>
              <TextField name="firstnames" onChange={(e) => changeValue(e.value, setFirstnames)} placeholder="Denis Jorge" icon={CaseSensitive} value={firstnames} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Apellidos:</FormControl.Label>
              <TextField name="lastnames" onChange={(e) => changeValue(e.value, setLastnames)} placeholder="Gandarillas Delgado" icon={CaseSensitive} value={lastnames} />
            </FormControl>
            <FormControl>
              <FormControl.Label>CI:</FormControl.Label>
              <TextField name="ci" onChange={(e) => changeValue(e.value, setCi)} placeholder="9999999" icon={IdCard} value={ci} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Ubicación:</FormControl.Label>
              <TextField name="location" onChange={(e) => changeValue(e.value, setAddress)} placeholder="Av. Sapiens #360" icon={MapPin} value={address} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Teléfono:</FormControl.Label>
              <TextField name="phone" onChange={(e) => changeValue(e.value, setPhone)} prefix="+591" placeholder="61234567" icon={Phone} value={phone} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Correo electrónico:</FormControl.Label>
              <TextField name="email" onChange={(e) => changeValue(e.value, setEmail)} placeholder="principal" icon={AtSign} value={email} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña:</FormControl.Label>
              <TextField
                name="password"
                onChange={(e) => changeValue(e.value, setPassword)}
                placeholder="password123"
                icon={KeyRound}
                inputAttributes={{ type: "password" }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Genero:</FormControl.Label>
              <Select name="city" placeholder="Elige una opción" options={genders} onChange={(e) => changeValue(e.value, setGender)} icon={VenusAndMars} value={gender} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Fecha de nacimiento:</FormControl.Label>
              <View width="360px" maxWidth="100%">
                <Popover
                  position="bottom"
                  width="trigger"
                  active={toggle.active}
                  onOpen={toggle.activate}
                  onClose={toggle.deactivate}
                >
                  <Popover.Trigger>
                    {(attributes) => {
                      return (
                        <Select
                          name="date"
                          inputAttributes={attributes}
                          placeholder="Selecciona tu fecha de nacimiento"
                          icon={Cake}
                        >
                          {birthdate.toLocaleDateString("es", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </Select>
                      );
                    }}
                  </Popover.Trigger>
                  <Popover.Content>
                    <Calendar
                      onChange={(args) => {
                        setBirthdate(args.value);
                        toggle.deactivate();
                      }}
                      value={birthdate}
                      min={minDate}
                      max={maxDate}
                      defaultMonth={new Date(maxDate.getFullYear(), maxDate.getMonth())}
                    />
                  </Popover.Content>
                </Popover>
              </View>
            </FormControl>
          </Grid>
          <div className="veau-actions w-full flex-r flex-cb">
            <Button onClick={deactivate} rounded>Cancelar</Button>
            <Button onClick={handleCreate} color="primary" rounded>Crear</Button>
          </div>
        </View>
      </Modal>
    </>
  )
}