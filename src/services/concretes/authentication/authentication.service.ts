import { AxiosError } from "axios";
import type { User } from "../../../models";
import { BaseService } from "../../bases";
import { backendHttp } from "../../../utils/http";

export class AuthenticationService extends BaseService {
  constructor() {
    super("auth", backendHttp);
  }

  async login(email: string, password: string) {
    try {
      const response = await this.http.post(this.url("login"), {
        email,
        password,
      });

      localStorage.setItem(import.meta.env.VITE_JWT_SECTION, response.data.jwt);
      return true;
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

  async me(jwt: string) {
    try {
      if (!jwt) return null;
      const response = await this.http.get(this.url("me"), {
        headers: {
          Authorization: jwt,
        },
      });

      return response.data satisfies User;
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

  isLogged(): boolean {
    const jwt = localStorage.getItem(import.meta.env.VITE_JWT_SECTION);
    return jwt !== null;
  }
}
