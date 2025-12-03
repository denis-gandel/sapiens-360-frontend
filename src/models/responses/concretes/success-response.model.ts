import type { BaseResponse } from "../bases/base-response.model";

export interface SuccessResponse<T> extends BaseResponse {
  data: T;
}
