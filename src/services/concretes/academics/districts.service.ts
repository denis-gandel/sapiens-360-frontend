import type { District } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class DistrictsService extends CRUDBaseService<District> {
  constructor() {
    super('academics/districts', backendHttp)
  }
}