import axios from "axios";

export class RolesService {
  private readonly API_URL = `${
    import.meta.env.VITE_BACKEND_URL
  }authorization/roles`;

  public async getRoles() {
    const response = await axios.get(this.API_URL);

    return response.data;
  }
}
