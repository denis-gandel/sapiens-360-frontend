import type { Role } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class RolesService extends CRUDBaseService<Role> {
  constructor() {
    super("authorization/roles", backendHttp);
  }
}
