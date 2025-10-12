import "./style.css"

import {
  AtSign,
  Cake,
  CaseSensitive,
  IdCard,
  KeyRound,
  MapPin,
  Phone,
  VenusAndMars
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  View,
  Grid,
  FormControl,
  TextField,
  Select,
  Popover,
  Calendar,
  useToggle,
  Button
} from "reshaped"


import { useRegistrationContext } from "../../../../contexts"

export function Principal() {
  const navigate = useNavigate()
  const {
    birthdate,
    emailDomainPrincipal,
    setFirstnames,
    setLastnames,
    setCi,
    setAddress,
    setPhonePrincipal,
    setEmailPrincipal,
    setPassword,
    setRepeatPassword,
    setGender,
    setBirthdate,
    changeValue,
    createPrincipal
  } = useRegistrationContext()

  const MIN_AGE = 25;
  const MAX_AGE = 65;

  const today = new Date();

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

  const handleRegister = async () => {
    const result = await createPrincipal()
    if (result) {
      navigate('/app/dashboard')
    }
  }

  return (
    <div className="principal-register-page">
      <h1>Registro de <span>director/a</span></h1>
      <Grid columns={{ s: 1, l: 2 }} gap={10}>
        <FormControl>
          <FormControl.Label>Nombres:</FormControl.Label>
          <TextField name="firstnames" onChange={(e) => changeValue(e.value, setFirstnames)} placeholder="Denis Jorge" icon={CaseSensitive} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Apellidos:</FormControl.Label>
          <TextField name="lastnames" onChange={(e) => changeValue(e.value, setLastnames)} placeholder="Gandarillas Delgado" icon={CaseSensitive} />
        </FormControl>
        <FormControl>
          <FormControl.Label>CI:</FormControl.Label>
          <TextField name="ci" onChange={(e) => changeValue(e.value, setCi)} placeholder="9999999" icon={IdCard} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Ubicación:</FormControl.Label>
          <TextField name="location" onChange={(e) => changeValue(e.value, setAddress)} placeholder="Av. Sapiens #360" icon={MapPin} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Teléfono:</FormControl.Label>
          <TextField name="phone" onChange={(e) => changeValue(e.value, setPhonePrincipal)} prefix="+591" placeholder="61234567" icon={Phone} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Correo electrónico:</FormControl.Label>
          <TextField name="email" onChange={(e) => changeValue(e.value, setEmailPrincipal)} suffix={emailDomainPrincipal} placeholder="principal" icon={AtSign} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Contraseña:</FormControl.Label>
          <TextField name="password" onChange={(e) => changeValue(e.value, setPassword)} placeholder="password123" icon={KeyRound} inputAttributes={{ type: "password" }} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Confirmar contraseña:</FormControl.Label>
          <TextField name="repeatPassword" onChange={(e) => changeValue(e.value, setRepeatPassword)} placeholder="password123" icon={KeyRound} inputAttributes={{ type: "password" }} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Genero:</FormControl.Label>
          <Select name="city" placeholder="Elige una opción" options={genders} onChange={(e) => changeValue(e.value, setGender)} icon={VenusAndMars} />
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
                      {birthdate?.toLocaleDateString("es", {
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
      <div className="principal-registration-actions flex-c">
        <Button color="primary" rounded onClick={handleRegister}>Finalizar</Button>
      </div>
    </div>
  )
}