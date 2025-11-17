import { AxiosError } from "axios";
import type { ICRUDService } from "../contracts/crud.service.interface";
import { BaseService } from "./base.service";
import { backendHttp } from "../../utils/http";

export abstract class CRUDBaseService<T>
  extends BaseService
  implements ICRUDService<T>
{
  constructor(baseUrl: string) {
    super(baseUrl, backendHttp);
  }
  async index(
    page?: number,
    size?: number,
    orderBy?: string,
    direction?: "asc" | "des",
    filters?: Record<string, string | number | boolean>
  ): Promise<T[]> {
    try {
      const params: Record<string, any> = {};
      if (page !== undefined) params.page = page;
      if (size !== undefined) params.size = size;
      if (orderBy) params.orderBy = orderBy;
      if (direction) params.direction = direction;

      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          params[`filters[${key}]`] = value;
        }
      }

      const response = await this.http.get<T[]>(this.url(), { params });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 500) {
          this.toaster.warning(
            "Parece que hay un problema temporal. Intenta nuevamente más tarde."
          );
        } else {
          this.toaster.critical(error.message);
        }

        throw error;
      }
      throw error;
    }
  }

  async show(
    column: string,
    value: string,
    fail?: boolean,
    onlyActive?: boolean,
    filters?: Record<string, string | number | boolean>
  ): Promise<T> {
    try {
      const params: Record<string, any> = {};
      params.column = column;
      params.value = value;
      if (fail !== undefined) params.fail = fail;
      if (onlyActive) params.onlyActive = onlyActive;

      if (filters) {
        for (const [key, value] of Object.entries(filters)) {
          params[`filters[${key}]`] = value;
        }
      }

      const response = await this.http.get<T>(this.url("by"), { params });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 500) {
          this.toaster.warning(
            "Parece que hay un problema temporal. Intenta nuevamente más tarde."
          );
        } else if (status === 404) {
          this.toaster.primary("Elemento no disponible.");
        } else {
          this.toaster.critical(error.message);
        }

        throw error;
      }
      throw error;
    }
  }

  async store(body: T): Promise<void> {
    try {
      await this.http.post(this.url(), body);
      this.toaster.success("Se guardó satisfactoriamente.");
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 500) {
          this.toaster.warning(
            "Parece que hay un problema temporal. Intenta nuevamente más tarde."
          );
        } else if (status === 422) {
          this.toaster.warning(
            "Ocurrió un problema. Por favor, inténtalo más tarde."
          );
        } else {
          this.toaster.critical(error.message);
        }

        throw error;
      }
      throw error;
    }
  }

  async update(body: T, id: string | number): Promise<void> {
    try {
      await this.http.put(this.url(`by/${id}`), { body });
      this.toaster.success("Se actualizo satisfactoriamente.");
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 500) {
          this.toaster.warning(
            "Parece que hay un problema temporal. Intenta nuevamente más tarde."
          );
        } else if (status === 422) {
          this.toaster.warning(
            "Ocurrió un problema. Por favor, inténtalo más tarde."
          );
        } else {
          this.toaster.critical(error.message);
        }

        throw error;
      }
      throw error;
    }
  }

  async destroy(id: string | number): Promise<void> {
    try {
      await this.http.delete(this.url(`by/${id}`));
      this.toaster.success("Usuario eliminado con éxito.");
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
}
