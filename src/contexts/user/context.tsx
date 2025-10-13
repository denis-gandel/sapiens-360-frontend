import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import type { User } from "../../models";
import { AuthenticationService } from "../../services";

interface Props {
  children: ReactNode
}

interface Types {
  // Values
  me: User | null
  jwt: string

  // Setters
  setJwt: React.Dispatch<React.SetStateAction<string>>
}

const UserContext = createContext<Types | undefined>(undefined)

export const UserProvider = ({ children }: Props) => {
  const [me, setMe] = useState<User | null>(null)
  const [jwt, setJwt] = useState("")

  const authenticationService: AuthenticationService = new AuthenticationService()

  const getMe = async () => {
    const user = await authenticationService.me(jwt)
    if (user) setMe(user)
  }

  useEffect(() => {
    if (!jwt) {
      const token = localStorage.getItem(import.meta.env.VITE_JWT_SECTION)
      setJwt(token ?? "")
    }
  }, [])

  useEffect(() => {
    getMe()
  }, [jwt])

  const result = useMemo(() => ({
    // Values
    me,
    jwt,

    // Setters
    setJwt
  }), [
    // Values
    me,
    jwt
  ])

  return (
    <UserContext.Provider value={result}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within an UserProvider"
    );
  }
  return context;
};