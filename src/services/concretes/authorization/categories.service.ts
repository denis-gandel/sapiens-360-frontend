import type { Category } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class CategoriesService extends CRUDBaseService<Category> {
  constructor() {
    super("authorization/categories", backendHttp);
  }
}
