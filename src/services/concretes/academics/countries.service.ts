import type { Country } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class CountriesService extends CRUDBaseService<Country> {
  constructor() {
    super('academics/countries', backendHttp)
  }
}