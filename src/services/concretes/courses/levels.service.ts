import type { Level } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class LevelsService extends CRUDBaseService<Level> {
  constructor() {
    super("courses/levels");
  }
}
