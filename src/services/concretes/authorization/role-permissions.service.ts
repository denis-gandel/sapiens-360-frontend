import { AxiosError } from "axios";
import type { RolePermissions, RolePermissionsResponse } from "../../../models";
import { CRUDBaseService } from "../../bases";
import type { SuccessResponse } from "../../../models/responses/concretes/success-response.model";
import { backendHttp } from "../../../utils/http";

export class RolePermissionsService extends CRUDBaseService<RolePermissions> {
  constructor() {
    super("auth/role-permissions", backendHttp);
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
      const response = await this.http.get<
        SuccessResponse<RolePermissionsResponse[]>
      >(this.url(`role/${roleId}/permissions?tenant=${tenantId}`));
      return response.data.data;
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
