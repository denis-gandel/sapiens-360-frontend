import type { Program } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class ProgramsService extends CRUDBaseService<Program> {
  constructor() {
    super("courses/programs")
  }
}