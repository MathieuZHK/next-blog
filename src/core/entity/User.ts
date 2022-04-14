import { GenderEnum } from "../enum/GenderEnum";
import { RoleEnum } from "../enum/RoleEnum";

export interface User {
  id: string;
  lastName: string;
  firstName: string;
  gender: GenderEnum;
  role: RoleEnum;
  created_at: string;
}
