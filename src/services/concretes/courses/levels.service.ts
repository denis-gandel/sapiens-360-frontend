import type { Level } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class LevelsService extends CRUDBaseService<Level> {
  constructor() {
    super("courses/levels", backendHttp);
  }
}
