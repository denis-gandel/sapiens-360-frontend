import type { Category } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class CategoriesService extends CRUDBaseService<Category> {
  constructor() {
    super("authorization/categories");
  }
}
