import type { BaseResponse } from "../bases/base-response.model";

export interface FailedResponse extends BaseResponse {
  errors: any;
}
