import "./style.css"

import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction
} from "react"
import {
  useRegistrationContext,
  useSapiensLayoutContext,
  useUserContext
} from "../../../../../contexts"
import { InstituteService } from "../../../../../services"
import type { Institute } from "../../../../../models"
import {
  Calendar,
  FileUpload,
  FormControl,
  Grid,
  Icon,
  Image,
  Popover,
  Select,
  TextField,
  useToggle,
  View
} from "reshaped"
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
} from "lucide-react"
import { ReadField } from "../../../../../components/forms/readfield/component"

type SelectType = { label: string, value: string }

export function Institute() {

  const [institute, setInstitute] = useState<Institute | null>(null)

  const [name, setName] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [location, setLocation] = useState("")
  const [logo, setLogo] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [foundationDate, setFoundationDate] = useState<Date>(new Date())
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [type, setType] = useState<number>(0);
  const [nature, setNature] = useState<number>(0);
  const [period, setPeriod] = useState<number>(0);
  const [state, setState] = useState<number>(0);
  const [city, setCity] = useState<number>(0);

  const { me } = useUserContext()
  const { setSubtitle, setIsLoading } = useSapiensLayoutContext()
  const { typeOptions, natureOptions, periodOptions, stateOptions, cityOptions, setState: setStateOption } = useRegistrationContext()

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

  const instituteService = new InstituteService()

  const changeValue = (value: any, setValue: Dispatch<SetStateAction<any>>) => setValue(value)

  const getInfo = async () => {
    if (me) {
      const response = await instituteService.getInstitute(me.tenant_id ?? "")
      setInstitute(response)
      console.log(response)
    }
  }

  const setInfo = () => {
    if (institute) {
      console.log(institute)
      setName(institute.name)
      setSubdomain(institute.subdomain)
      setLocation(institute.location)
      setLogo(institute.logo ?? "")
      setEmail(institute.email)
      setPhone(institute.phone)
      setFoundationDate(institute.foundation_date ? new Date(institute.foundation_date) : new Date());
      setStartDate(institute.start_date ? new Date(institute.start_date) : new Date());
      setEndDate(institute.end_date ? new Date(institute.end_date) : new Date())
      setType(institute.type_id)
      setNature(institute.nature_id)
      setPeriod(institute.period_id)
      setState(institute.state_id)
      setStateOption(`${institute.state_id}`)
      setCity(institute.city_id)
    }
  }

  const getLabel = (options: SelectType[], value: string | number) =>
    options.find((x) => x.value === `${value}`)?.label ?? "";

  useEffect(() => {
    getInfo()
  }, [me])

  useEffect(() => {
    if (institute) {
      setSubtitle(<>{institute.name}</>)
      setInfo()
      setIsLoading(false)
    }
  }, [institute])

  return (
    <>
      <div className="w-full flex-c flex-cc">
        <div className="ip-image-view">
          <FileUpload
            name="file"
            onChange={(event) => {
              const file = event.value[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setLogo(url);
              }
            }}
          >
            <View
              minWidth="80px"
              minHeight="80px"
              width="100%"
              height="100%"
              maxWidth="300px"
              maxHeight="300px"
              borderRadius="medium"
              backgroundColor="neutral-faded"
              align="center"
              justify="center"
              padding={4}
            >
              {logo ? (
                <Image
                  src={logo}
                  width="100%"
                  height="100%"
                  alt="Logo del instituto"
                />
              ) : (
                <Icon svg={University} size={40} color="neutral-faded" />
              )}
            </View>
          </FileUpload>
        </div>
      </div>
      <Grid columns={{ s: 1, l: 2 }} gap={10}>
        <FormControl>
          <FormControl.Label>Nombre:</FormControl.Label>
          <TextField name="name" onChange={(e) => changeValue(e.value, setName)} placeholder="Colegio Sapiens360" icon={University} value={name} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Correo electrónico:</FormControl.Label>
          <TextField name="email" onChange={(e) => changeValue(e.value, setEmail)} placeholder="contact@sapiens-360.xyz" icon={AtSign} value={email} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Subdominio:</FormControl.Label>
          <ReadField text={subdomain} icon={Globe} suffix=".sapiens-360.xyz" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Teléfono:</FormControl.Label>
          <TextField name="name" prefix="+591" placeholder="61234567" onChange={(e) => changeValue(`+591 ${e.value}`, setPhone)} icon={Phone} value={phone} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Tipo:</FormControl.Label>
          <ReadField text={getLabel(typeOptions, type)} icon={Shapes} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Naturaleza:</FormControl.Label>
          <ReadField text={getLabel(natureOptions, nature)} icon={Landmark} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Periodo:</FormControl.Label>
          <ReadField text={getLabel(periodOptions, period)} icon={CalendarRange} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Estado/Departamento:</FormControl.Label>
          <ReadField text={getLabel(stateOptions, state)} icon={Fence} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Ciudad/Municipio:</FormControl.Label>
          <ReadField text={getLabel(cityOptions, city)} icon={Building} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Ubicación:</FormControl.Label>
          <TextField name="location" onChange={(e) => changeValue(e.value, setLocation)} placeholder="Av. Sapiens360 entre Calle SapiensLMS " icon={MapPin} value={location} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Fecha de inicio:</FormControl.Label>
          <View>
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
                      {startDate
                        ? new Date(startDate).toLocaleDateString("es", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        : "Fecha no disponible"}

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
          <View>
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
                      {endDate
                        ? new Date(endDate).toLocaleDateString("es", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        : "Fecha no disponible"}
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
          <View>
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
                      {foundationDate
                        ? new Date(foundationDate).toLocaleDateString("es", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        : "Fecha no disponible"}

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
    </>
  )
}