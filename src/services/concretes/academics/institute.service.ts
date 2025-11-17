import type { SetStateAction } from "react";
import type { Institute } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class InstituteService extends CRUDBaseService<Institute> {
  constructor() {
    super("academics/institutes");
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
    const response = await this.http.get(this.url("by"), { params });

    if (response) setError("Ese subdominio ya está en uso, prueba con otro.");
  }
}
