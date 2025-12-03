import type { SetStateAction } from "react";
import type { Institute } from "../../../models";
import { CRUDBaseService } from "../../bases";
import type { SuccessResponse } from "../../../models/responses/concretes/success-response.model";
import { backendHttp } from "../../../utils/http";

export class InstituteService extends CRUDBaseService<Institute> {
  constructor() {
    super("academics/institutes", backendHttp);
  }

  async verifySubdomain(
    subdomain: string,
    setError: (value: SetStateAction<string>) => void
  ): Promise<void> {
    if (!subdomain) return;

    const params: Record<string, any> = {
      column: "subdomain",
      value: subdomain,
    };
    const response = await this.http.get<SuccessResponse<boolean>>(this.url("by"), { params });

    if (response.data.data) setError("Ese subdominio ya está en uso, prueba con otro.");
  }
}
