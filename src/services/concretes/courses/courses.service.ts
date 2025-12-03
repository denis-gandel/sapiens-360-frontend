import type { Course } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class CoursesService extends CRUDBaseService<Course> {
  constructor() {
    super("courses/courses", backendHttp);
  }
}
