import type { District } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class DistrictsService extends CRUDBaseService<District> {
  constructor() {
    super('academics/districts')
  }
}