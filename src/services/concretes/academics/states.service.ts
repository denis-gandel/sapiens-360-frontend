import type { State } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class StatesService extends CRUDBaseService<State> {
  constructor() {
    super("academics/states");
  }
}
