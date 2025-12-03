import type { State } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class StatesService extends CRUDBaseService<State> {
  constructor() {
    super("academics/states", backendHttp);
  }
}
