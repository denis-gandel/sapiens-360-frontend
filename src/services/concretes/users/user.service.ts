import type { User } from "../../../models";
import { CRUDBaseService } from "../../bases";

export class UserService extends CRUDBaseService<User> {
  constructor() {
    super('users')
  }
}
