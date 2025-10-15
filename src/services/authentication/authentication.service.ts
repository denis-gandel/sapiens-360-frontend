import axios from "axios";
import type { User } from "../../models";

export class AuthenticationService {
  private readonly API_URL = `${import.meta.env.VITE_BACKEND_URL}auth`;

  public async login(email: string, password: string) {
    const response = await axios.post(
      `${this.API_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      localStorage.setItem(import.meta.env.VITE_JWT_SECTION, response.data.jwt);
    }

    return response.status === 200;
  }

  public async me(jwt: string) {
    if (!jwt) return null;
    const response = await axios.get(`${this.API_URL}/me`, {
      headers: {
        Authorization: jwt,
      },
    });

    return response.data as User;
  }

  public isLogged() {
    const jwt = localStorage.getItem(import.meta.env.VITE_JWT_SECTION);
    return jwt !== null;
  }
}
