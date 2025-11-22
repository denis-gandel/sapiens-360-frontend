import type { Country } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class CountriesService extends CRUDBaseService<Country> {
  constructor() {
    super('academics/countries')
  }
}