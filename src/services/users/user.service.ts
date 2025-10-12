import axios from "axios";
import type { User } from "../../models";

export class UserService {
  private readonly API_URL = `${import.meta.env.VITE_BACKEND_URL}users`;

  public async createUser(user: User) {
    if (!user) return false;
    const response = await axios.post(this.API_URL, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.status === 200 || response.status === 201;
  }
}
