import type { Subject } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class SubjectsService extends CRUDBaseService<Subject> {
  constructor() {
    super("courses/subjects");
  }
}
