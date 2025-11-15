import axios from "axios";

export class RolePermissionsService {
  private readonly API_URL = `${import.meta.env.VITE_BACKEND_URL}auth/role-permissions/`;

  public async initializeTenant(tenantId: string) {
    const apiUrl = `${this.API_URL}initialize/${tenantId}`;
    const response = await axios.get(apiUrl);
    return response.status === 201;
  }
}
