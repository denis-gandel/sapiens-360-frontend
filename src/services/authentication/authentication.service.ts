import axios from "axios";

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

    return response.status === 200;
  }
}
