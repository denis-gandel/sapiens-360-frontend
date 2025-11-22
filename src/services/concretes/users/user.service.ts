import { AxiosError } from "axios";
import type { User } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class UserService extends CRUDBaseService<User> {
  constructor() {
    super("users");
  }

  async verifyCredentials(email: string, password: string) {
    try {
      const body = {
        email,
        password,
      };

      const response = await this.http.post(
        this.url("credentials/verify"),
        body
      );

      return response.status === 200;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 401) {
          this.toaster.warning("Verifica tus datos e inténtalo nuevamente.");
        } else if (status === 401) {
          this.toaster.warning("Verifica tus datos e inténtalo nuevamente.");
        } else {
          this.toaster.critical(error.message);
        }

        throw error;
      }
      throw error;
    }
  }

  async me(jwt: string) {
    try {
      const response = await this.http.get(this.url("me"), {
        headers: {
          Authorization: jwt,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 401) {
          this.toaster.warning("Verifica tus datos e inténtalo nuevamente.");
        } else if (status === 400) {
          this.toaster.warning("Intenta nuevamente.");
        } else {
          this.toaster.critical(error.message);
        }

        throw error;
      }
      throw error;
    }
  }
}
