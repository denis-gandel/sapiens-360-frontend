import axios from "axios";

import type { Role, RolePermissionsResponse } from "../../models";

export class AuthorizationService {
  private readonly API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  // Roles
  public async getRoles() {
    const apiUrl = `${this.API_URL}authorization/roles`;
    const response = await axios.get(apiUrl);
    return response.data as Role[];
  }

  // Permissions by role
  public async getPermissionsByRole(roleId: number, tenantId: string) {
    const apiUrl = `${this.API_URL}auth/role-permissions/role/${roleId}/permissions?tenant=${tenantId}`;
    const response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data as RolePermissionsResponse[];
  }
}
