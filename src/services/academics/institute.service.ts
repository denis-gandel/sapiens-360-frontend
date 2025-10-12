import axios from "axios";
import type { Institute } from "../../models";
import { instituteSchema } from "../../validations/institute.schema";
import type { SetStateAction } from "react";

export class InstituteService {
  private readonly API_URL = `${
    import.meta.env.VITE_BACKEND_URL
  }academics/institutes`;

  public async createInstitute(institute: Institute) {
    try {
      const result = await instituteSchema.safeParseAsync(institute);

      if (result.success) {
        const response = await axios.post(this.API_URL, result.data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (response.status === 200 || response.status === 201) {
          const institute = await axios.get(
            `${this.API_URL}/by?column=subdomain&value=${result.data.subdomain}`
          );
          const id = institute.data.id;
          return id;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async verifySubdomain(
    subdomain: string,
    setError: (value: SetStateAction<string>) => void
  ) {
    if (!subdomain) return;

    const apiUrl = `${this.API_URL}/by?column=subdomain&value=${subdomain}`;

    try {
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        setError("Ese subdominio ya está en uso, prueba con otro.");
      }
    } catch (error: any) {
      if (error.status === 404) return;
    }
  }
}
