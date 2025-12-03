import type { ICRUDService } from "../contracts/crud.service.interface";
import { lmsHttp } from "../../utils/http";
import { CRUDBaseService } from "./crud.base.service";

export abstract class LMSBaseService<T>
  extends CRUDBaseService<T>
  implements ICRUDService<T>
{
  constructor(baseUrl: string) {
    super(baseUrl, lmsHttp);
  }
}
