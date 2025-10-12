import "./style.css"

import {
  AtSign,
  Building,
  Cake,
  CalendarRange,
  Fence,
  Globe,
  Landmark,
  MapPin,
  Phone,
  Shapes,
  University
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Calendar,
  FormControl,
  Grid,
  Popover,
  Select,
  TextField,
  useToggle,
  View
} from "reshaped";

import { useRegistrationContext } from "../../../../contexts";

export function InstituteRegistration() {

  const navigate = useNavigate()
  const {
    // Values
    startDate,
    endDate,
    foundationDate,

    // Setters
    setName,
    setEmail,
    setSubdomain,
    setPhone,
    setType,
    setNature,
    setPeriod,
    setState,
    setCity,
    setLocation,
    setStartDate,
    setEndDate,
    setFoundationDate,

    // Options
    typeOptions,
    natureOptions,
    periodOptions,
    stateOptions,
    cityOptions,

    // Errors
    subdomainError,

    // Functions
    changeValue,
    createInstitute
  } = useRegistrationContext()

  const startToggle = useToggle();
  const endToggle = useToggle();
  const foundationToogle = useToggle();

  const today = new Date();

  const minDate = new Date(today.getFullYear() - 1, 0, 1);
  const maxDate = new Date(today.getFullYear() + 1, 11, 31);

  minDate.setHours(0, 0, 0, 0);
  maxDate.setHours(23, 59, 59, 999);

  const minDateFoundation = new Date(-62135596800000);
  const maxDateFoundation = new Date();

  minDateFoundation.setHours(0, 0, 0, 0);
  maxDateFoundation.setHours(23, 59, 59, 999);



  const handleRegistration = async () => {
    if (await createInstitute()) navigate('/app/registration/terms-and-conditions')
  }

  return (
    <div className="registration-institute-container">
      <h1>¡Empecemos con tu <span>instituto</span>!</h1>
      <Grid columns={{ s: 1, l: 2 }} gap={10}>
        <FormControl>
          <FormControl.Label>Nombre:</FormControl.Label>
          <TextField name="name" onChange={(e) => changeValue(e.value, setName)} placeholder="Colegio Sapiens360" icon={University} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Correo electrónico:</FormControl.Label>
          <TextField name="email" onChange={(e) => changeValue(e.value, setEmail)} placeholder="contact@sapiens-360.xyz" icon={AtSign} />
        </FormControl>
        <FormControl hasError={subdomainError !== ""}>
          <FormControl.Label>Subdominio:</FormControl.Label>
          <TextField name="subdomain" placeholder="sapiens-360" suffix=".sapiens-360.xyz" onChange={(e) => changeValue(e.value, setSubdomain)} icon={Globe} hasError={subdomainError !== ""} />
          {subdomainError && <FormControl.Error>{subdomainError}</FormControl.Error>}
        </FormControl>
        <FormControl>
          <FormControl.Label>Teléfono:</FormControl.Label>
          <TextField name="name" prefix="+591" placeholder="61234567" onChange={(e) => changeValue(`+591 ${e.value}`, setPhone)} icon={Phone} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Tipo:</FormControl.Label>
          <Select name="type" placeholder="Elige una opción" options={typeOptions} onChange={(e) => changeValue(e.value, setType)} icon={Shapes} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Naturaleza:</FormControl.Label>
          <Select name="nature" placeholder="Elige una opción" options={natureOptions} onChange={(e) => changeValue(e.value, setNature)} icon={Landmark} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Periodo:</FormControl.Label>
          <Select name="period" placeholder="Elige una opción" options={periodOptions} onChange={(e) => changeValue(e.value, setPeriod)} icon={CalendarRange} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Estado/Departamento:</FormControl.Label>
          <Select name="state" placeholder="Elige una opción" options={stateOptions} onChange={(e) => changeValue(e.value, setState)} icon={Fence} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Ciudad/Municipio:</FormControl.Label>
          <Select name="city" placeholder="Elige una opción" options={cityOptions} onChange={(e) => changeValue(e.value, setCity)} icon={Building} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Ubicación:</FormControl.Label>
          <TextField name="location" onChange={(e) => changeValue(e.value, setLocation)} placeholder="Av. Sapiens360 entre Calle SapiensLMS " icon={MapPin} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Fecha de inicio:</FormControl.Label>
          <View width="360px" maxWidth="100%">
            <Popover
              position="bottom"
              width="trigger"
              active={startToggle.active}
              onOpen={startToggle.activate}
              onClose={startToggle.deactivate}
            >
              <Popover.Trigger>
                {(attributes) => {
                  return (
                    <Select
                      name="date"
                      inputAttributes={attributes}
                      placeholder="Selecciona la fecha de inicio"
                      icon={Cake}
                    >
                      {startDate?.toLocaleDateString("es", {
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
                    setStartDate(args.value);
                    startToggle.deactivate();
                  }}
                  value={startDate}
                  min={minDate}
                  max={maxDate}
                  defaultMonth={new Date(maxDate.getFullYear(), maxDate.getMonth())}
                />
              </Popover.Content>
            </Popover>
          </View>
        </FormControl>
        <FormControl>
          <FormControl.Label>Fecha de finalización:</FormControl.Label>
          <View width="360px" maxWidth="100%">
            <Popover
              position="bottom"
              width="trigger"
              active={endToggle.active}
              onOpen={endToggle.activate}
              onClose={endToggle.deactivate}
            >
              <Popover.Trigger>
                {(attributes) => {
                  return (
                    <Select
                      name="date"
                      inputAttributes={attributes}
                      placeholder="Selecciona la fecha de finalización"
                      icon={Cake}
                    >
                      {endDate?.toLocaleDateString("es", {
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
                    setEndDate(args.value);
                    endToggle.deactivate();
                  }}
                  value={endDate}
                  min={minDate}
                  max={maxDate}
                  defaultMonth={new Date(maxDate.getFullYear(), maxDate.getMonth())}
                />
              </Popover.Content>
            </Popover>
          </View>
        </FormControl>
        <FormControl>
          <FormControl.Label>Fecha de fundación:</FormControl.Label>
          <View width="360px" maxWidth="100%">
            <Popover
              position="bottom"
              width="trigger"
              active={foundationToogle.active}
              onOpen={foundationToogle.activate}
              onClose={foundationToogle.deactivate}
            >
              <Popover.Trigger>
                {(attributes) => {
                  return (
                    <Select
                      name="date"
                      inputAttributes={attributes}
                      placeholder="Selecciona la fecha de fundación"
                      icon={Cake}
                    >
                      {foundationDate?.toLocaleDateString("es", {
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
                    setFoundationDate(args.value);
                    foundationToogle.deactivate();
                  }}
                  value={foundationDate}
                  min={minDateFoundation}
                  max={maxDateFoundation}
                  defaultMonth={new Date(maxDate.getFullYear(), maxDate.getMonth())}
                />
              </Popover.Content>
            </Popover>
          </View>
        </FormControl>
      </Grid>
      <div className="registration-actions-section flex-c">
        <Button color="primary" rounded onClick={handleRegistration}>Continuar</Button>
      </div>
    </div>
  )
}