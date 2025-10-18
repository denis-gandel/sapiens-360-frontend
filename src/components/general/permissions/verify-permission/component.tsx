import { useEffect, useState, type ReactNode } from "react";
import { useUserContext } from "../../../../contexts";

interface Props {
  permission: string;
  children: ReactNode;
}

export const VerifyPermission = ({ permission, children }: Props) => {

  const { permissions } = useUserContext()

  const [result, setResult] = useState<boolean>(false);

  const hasPermissionRecursive = (
    categories: any[],
    permissionCode: string
  ): boolean => {
    for (const category of categories) {
      if (category.code === permissionCode) return true;
      if (
        category.permissions?.some((perm: any) => perm.code === permissionCode)
      ) {
        return true;
      }

      if (category.subCategories && category.subCategories.length > 0) {
        if (hasPermissionRecursive(category.subCategories, permissionCode)) {
          return true;
        }
      }
    }

    return false;
  };

  const verifyPermission = (permissionCode: string): boolean => {
    if (!permissions || !Array.isArray(permissions)) {
      return false;
    }

    return hasPermissionRecursive(permissions, permissionCode);
  };

  useEffect(() => {
    const hasPermission = verifyPermission(permission);
    setResult(hasPermission);
  }, [permission, verifyPermission]);

  return <>{result ? children : <></>}</>;
};