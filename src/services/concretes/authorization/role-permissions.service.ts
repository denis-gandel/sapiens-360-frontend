import { AxiosError } from "axios";
import type { RolePermissions, RolePermissionsResponse } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class RolePermissionsService extends CRUDBaseService<RolePermissions> {
  constructor() {
    super("auth/role-permissions");
  }

  async initialize(tenantId: string) {
    try {
      await this.http.post(this.url(`initialize/${tenantId}`));
    } catch (error) {
      if (error instanceof AxiosError) {
        this.toaster.warning(
          "Ocurrió un problema. Por favor, inténtalo más tarde."
        );
        throw error;
      }
      throw error;
    }
  }

  async getPermissionsByRole(
    roleId: number,
    tenantId: string
  ): Promise<RolePermissionsResponse[]> {
    try {
      const response = await this.http.get(
        this.url(`role/${roleId}/permissions?tenant=${tenantId}`)
      );
      return response.data satisfies RolePermissionsResponse[];
    } catch (error) {
      if (error instanceof AxiosError) {
        this.toaster.warning(
          "Ocurrió un problema. Por favor, inténtalo más tarde."
        );
        throw error;
      }
      throw error;
    }
  }
}
