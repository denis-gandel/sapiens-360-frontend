import type { Course } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class CoursesService extends CRUDBaseService<Course> {
  constructor() {
    super("courses/courses");
  }
}
