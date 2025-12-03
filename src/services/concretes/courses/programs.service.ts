import type { Program } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class ProgramsService extends CRUDBaseService<Program> {
  constructor() {
    super("courses/programs", backendHttp)
  }
}