import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from "react";

type setHtmlFunction = Dispatch<SetStateAction<ReactNode | null>>
type setBooleanFunction = Dispatch<SetStateAction<boolean>>

interface Props {
  children: ReactNode
}

interface Types {
  // Values
  title: ReactNode | null
  subtitle: ReactNode | null
  isLoading: boolean

  // Setters
  setTitle: setHtmlFunction
  setSubtitle: setHtmlFunction
  setIsLoading: setBooleanFunction
}

const SapiensLayoutContext = createContext<Types | undefined>(undefined)

export const SapiensLayoutProvider = ({ children }: Props) => {

  const [title, setTitle] = useState<ReactNode | null>(null)
  const [subtitle, setSubtitle] = useState<ReactNode | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const result = useMemo(() => ({
    // Values
    title,
    subtitle,
    isLoading,

    // Setters
    setTitle,
    setSubtitle,
    setIsLoading
  }), [
    title,
    subtitle,
    isLoading
  ])

  return (
    <SapiensLayoutContext.Provider value={result}>
      {children}
    </SapiensLayoutContext.Provider>
  )
}

export const useSapiensLayoutContext = () => {
  const context = useContext(SapiensLayoutContext);
  if (!context) {
    throw new Error(
      "useSapiensLayoutContext must be used within an SapiensLayoutProvider"
    );
  }
  return context;
};