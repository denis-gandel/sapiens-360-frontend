import type { Role } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class RolesService extends CRUDBaseService<Role> {
  constructor() {
    super("authorization/roles");
  }
}
