import type { IService } from "./base.service.interface";

type FilterValue = string | number | boolean;
type Direction = "asc" | "des" | null;

type paginateResponse<T> = {
  items: T[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export interface ICRUDService<T> extends IService {
  index(
    page?: number,
    size?: number,
    orderBy?: string,
    direction?: Direction,
    filters?: Record<string, FilterValue>
  ): Promise<paginateResponse<T>>;

  show(
    column: string,
    value: string,
    fail?: boolean,
    onlyActive?: boolean,
    filters?: Record<string, FilterValue>
  ): Promise<T>;

  store(body: T): Promise<void>;

  update(body: T, id: string | number): Promise<void>;

  destroy(id: string | number): Promise<void>;
}
