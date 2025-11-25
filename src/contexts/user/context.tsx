import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { RolePermissionsResponse, User } from "../../models";
import { AuthenticationService, RolePermissionsService } from "../../services";

interface Props {
  children: ReactNode;
}

interface Types {
  // Values
  me: User | null;
  jwt: string;
  permissions: RolePermissionsResponse[];

  // Setters
  setJwt: Dispatch<SetStateAction<string>>;
  setPermissions: Dispatch<SetStateAction<RolePermissionsResponse[]>>;

  logOut: () => void;
}

const UserContext = createContext<Types | undefined>(undefined);

export const UserProvider = ({ children }: Props) => {
  const [me, setMe] = useState<User | null>(null);
  const [jwt, setJwt] = useState("");
  const [permissions, setPermissions] = useState<RolePermissionsResponse[]>([]);

  const authenticationService: AuthenticationService =
    new AuthenticationService();
  const rolePermissionsService: RolePermissionsService =
    new RolePermissionsService();

  const getMe = async () => {
    const user = await authenticationService.me(jwt);
    if (user) setMe(user);
  };

  const getPermissions = async () => {
    if (me) {
      const response = await rolePermissionsService.getPermissionsByRole(
        me.role_id ?? 1,
        me.tenant_id ?? ""
      );

      setPermissions(response);
    }
  };

  const logOut = () => {
    localStorage.removeItem(import.meta.env.VITE_JWT_SECTION);
    setJwt("");
    setMe(null);
    setPermissions([]);
  };

  useEffect(() => {
    if (!jwt) {
      const token = localStorage.getItem(import.meta.env.VITE_JWT_SECTION);
      setJwt(token ?? "");
    }
  }, []);

  useEffect(() => {
    getMe();
  }, [jwt]);

  useEffect(() => {
    getPermissions();
  }, [me]);

  const result = useMemo(
    () => ({
      // Values
      me,
      jwt,
      permissions,

      // Setters
      setJwt,
      setPermissions,
      logOut,
    }),
    [
      // Values
      me,
      jwt,
      permissions,
    ]
  );

  return <UserContext.Provider value={result}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
