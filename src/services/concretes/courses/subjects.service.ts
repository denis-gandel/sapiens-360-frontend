import type { Subject } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class SubjectsService extends CRUDBaseService<Subject> {
  constructor() {
    super("courses/subjects", backendHttp);
  }
}
