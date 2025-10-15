export interface RolePermissions {
  id?: number;
  role_id: number;
  permissions: Array<number>;
  tenant_id: string;
}
