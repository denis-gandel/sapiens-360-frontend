import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from "react";
import axios from "axios";

import type { Institute, User } from "../../models";
import {
  AuthenticationService,
  InstituteService,
  UserService,
  RolePermissionsService
} from "../../services";

type SelectType = { label: string, value: string }
type Type = { id: number, name: string }


interface Props {
  children: ReactNode;
}

type setTextFunction = (value: string) => void;
type setDateFunction = (value: Date | null) => void;

interface Types {
  // Values
  startDate: Date | null
  endDate: Date | null
  foundationDate: Date | null
  birthdate: Date | null
  emailDomainPrincipal: string

  // Setters
  // institute setters
  setName: setTextFunction
  setEmail: setTextFunction
  setSubdomain: setTextFunction
  setPhone: setTextFunction
  setType: setTextFunction
  setNature: setTextFunction
  setPeriod: setTextFunction
  setState: setTextFunction
  setCity: setTextFunction
  setLocation: setTextFunction,
  setStartDate: Dispatch<SetStateAction<Date | null>>
  setEndDate: Dispatch<SetStateAction<Date | null>>
  setFoundationDate: Dispatch<SetStateAction<Date | null>>

  // principal setters
  setFirstnames: setTextFunction
  setLastnames: setTextFunction
  setCi: setTextFunction
  setAddress: setTextFunction
  setPhonePrincipal: setTextFunction
  setEmailPrincipal: setTextFunction
  setPassword: setTextFunction
  setRepeatPassword: setTextFunction
  setGender: Dispatch<SetStateAction<"M" | "F">>
  setBirthdate: setDateFunction

  // Options
  typeOptions: SelectType[]
  natureOptions: SelectType[]
  periodOptions: SelectType[]
  stateOptions: SelectType[]
  cityOptions: SelectType[]

  // Errors
  subdomainError: string
  setSubdomainError: setTextFunction

  // Functions
  changeValue: (value: any, setValue: Dispatch<any>) => void
  createInstitute: () => Promise<boolean>
  createPrincipal: () => Promise<boolean>
}

const RegistrationContext = createContext<Types | undefined>(undefined);

export const RegistrationProvider = ({ children }: Props) => {
  // Values
  const [id, setId] = useState<string>()

  // institute values
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [subdomain, setSubdomain] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [type, setType] = useState<string>()
  const [nature, setNature] = useState<string>()
  const [period, setPeriod] = useState<string>()
  const [state, setState] = useState<string>()
  const [city, setCity] = useState<string>()
  const [location, setLocation] = useState<string>()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [foundationDate, setFoundationDate] = useState<Date | null>(null)

  // principal values
  const [firstnames, setFirstnames] = useState("")
  const [lastnames, setLastnames] = useState("")
  const [ci, setCi] = useState("")
  const [address, setAddress] = useState("")
  const [phonePrincipal, setPhonePrincipal] = useState("")
  const [emailPrincipal, setEmailPrincipal] = useState("")
  const [emailDomainPrincipal, setEmailDomainPrincipal] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [gender, setGender] = useState<"M" | "F">("M")
  const [birthdate, setBirthdate] = useState<Date | null>(null)

  // Options
  const [typeOptions, setTypeOptions] = useState<SelectType[]>([])
  const [natureOptions, setNatureOptions] = useState<SelectType[]>([])
  const [periodOptions, setPeriodOptions] = useState<SelectType[]>([])
  const [stateOptions, setStateOptions] = useState<SelectType[]>([])
  const [cityOptions, setCityOptions] = useState<SelectType[]>([])

  // Errors
  const [subdomainError, setSubdomainError] = useState<string>("")

  // Services
  const instituteService: InstituteService = new InstituteService()
  const userService: UserService = new UserService()
  const authenticationService: AuthenticationService = new AuthenticationService()
  const rolePermissionsService: RolePermissionsService = new RolePermissionsService()

  // Functions
  const changeValue = (value: any, setValue: Dispatch<SetStateAction<any>>) => setValue(value)

  const fetchOptions = async (
    endpoint: string,
    setter: (options: SelectType[]) => void
  ) => {
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}academics/${endpoint}`
    const response = await axios.get(apiUrl)

    const data = response.data as Type[]

    if (!data) return

    const options: SelectType[] = data.map(item => ({
      label: item.name ?? "",
      value: item.id?.toString() ?? ""
    }))

    setter(options)
  }

  const createInstitute = async () => {
    if (!startDate || !endDate || !foundationDate || !email) return false
    const institute: Institute = {
      name: name ?? "",
      subdomain: subdomain ?? "",
      location: location ?? "",
      email: email ?? "",
      phone: phone ?? "",
      foundation_date: foundationDate,
      start_date: startDate,
      end_date: endDate,
      type_id: Number.parseInt(type ?? "0"),
      nature_id: Number.parseInt(nature ?? "0"),
      period_id: Number.parseInt(period ?? "0"),
      country_id: 1,
      state_id: Number.parseInt(state ?? "0"),
      city_id: Number.parseInt(city ?? "0"),
    }
    const instituteId = await instituteService.createInstitute(institute)
    if (instituteId) {
      const emailDomain = email.split('@')[1]
      setEmailDomainPrincipal(`@${emailDomain}`)
      setId(instituteId)
      rolePermissionsService.initializeTenant(instituteId)
      return true
    }
    return false
  }

  const createPrincipal = async () => {
    if (!birthdate) return false
    const principal: User = {
      firstnames: firstnames,
      lastnames: lastnames,
      ci: ci,
      address: address,
      phone: phonePrincipal,
      email: `${emailPrincipal}${emailDomainPrincipal}`,
      password: password,
      gender: gender,
      birthdate: birthdate,
      role_id: 4,
      tenant_id: id
    }

    const result = await userService.createUser(principal)

    if (result) {
      const isLogged = await authenticationService.login(`${emailPrincipal}${emailDomainPrincipal}`, password)
      return isLogged
    }
    return false
  }

  const verifySubdomain = async () => {
    if (subdomain) await instituteService.verifySubdomain(subdomain, setSubdomainError)
  }

  useEffect(() => {
    fetchOptions("types", setTypeOptions)
    fetchOptions("natures", setNatureOptions)
    fetchOptions("periods", setPeriodOptions)
    fetchOptions("states?filters[country_id]=1", setStateOptions)
  }, [])

  useEffect(() => {
    if (state) {
      fetchOptions(`cities?filters[state_id]=${state}`, setCityOptions)
    }
  }, [state])

  useEffect(() => {
    verifySubdomain()
  }, [subdomain])

  const result = useMemo(
    () => ({
      // Values
      startDate,
      endDate,
      foundationDate,
      birthdate,
      emailDomainPrincipal,

      // Setters
      // institute setters
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

      // principal setters
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

      // Options
      typeOptions,
      natureOptions,
      periodOptions,
      stateOptions,
      cityOptions,

      // Errors
      subdomainError,
      setSubdomainError,

      // Functions
      changeValue,
      createInstitute,
      createPrincipal
    }),
    [
      // Values
      subdomain,
      startDate,
      endDate,
      foundationDate,
      emailDomainPrincipal,

      // principal values
      firstnames,
      lastnames,
      ci,
      address,
      phonePrincipal,
      emailPrincipal,
      password,
      repeatPassword,
      gender,
      birthdate,

      // Options
      typeOptions,
      natureOptions,
      periodOptions,
      stateOptions,
      cityOptions,

      // Errors
      subdomainError,
    ]
  );

  return (
    <RegistrationContext.Provider value={result}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrationContext must be used within an RegistrationProvider"
    );
  }
  return context;
};