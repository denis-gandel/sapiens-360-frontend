import type { City } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class CitiesService extends CRUDBaseService<City> {
  constructor() {
    super('academics/cities')
  }
}