import type { City } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class CitiesService extends CRUDBaseService<City> {
  constructor() {
    super('academics/cities', backendHttp)
  }
}