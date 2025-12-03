import type { BaseResponse } from "../bases/base-response.model";

export interface PaginateResponse<T> extends BaseResponse {
  items: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
