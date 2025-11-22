import type { Permission } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class PermissionsService extends CRUDBaseService<Permission> {
  constructor() {
    super("authorization/permissions");
  }
}
