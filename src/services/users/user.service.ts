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

  public async getAllUsers(
    tenantId: string,
    page?: number,
    size?: number,
    orderBy?: string,
    direction?: "asc" | "desc"
  ) {
    let apiUrl = `${this.API_URL}?filters[tenant_id]=${tenantId}`;
    if (page) apiUrl = `${apiUrl}&page=${page}`;
    if (size) apiUrl = `${apiUrl}&size=${size}`;
    if (orderBy) apiUrl = `${apiUrl}&orderBy=${orderBy}`;
    if (direction) apiUrl = `${apiUrl}&direction=${direction}`;

    const response = await axios.get(apiUrl);

    const users = page && size ? (response.data.data as User[]) : response.data;

    const data = {
      page: response.data.current_page ?? 0,
      data: users,
      total: response.data.total ?? 0,
      lastPage: response.data.last_page ?? 0,
    };

    return data;
  }
}
