import type { Permission } from "../../../models";
import { backendHttp } from "../../../utils/http";
import { CRUDBaseService } from "../../bases";

export class PermissionsService extends CRUDBaseService<Permission> {
  constructor() {
    super("authorization/permissions", backendHttp);
  }
}
