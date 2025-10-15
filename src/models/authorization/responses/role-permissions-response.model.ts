import type { Permission } from "../permission.model";

export interface RolePermissionsResponse {
  id?: number;
  name?: string;
  path?: string;
  code?: string;
  permissions?: Permission[];
  subCategories?: RolePermissionsResponse[];
}
