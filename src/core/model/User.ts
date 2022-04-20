import { RoleEnum } from "../enum/RoleEnum";

export interface User {
  id: string;
  nickname: string;
  role: RoleEnum;
  created_at: string;
}
export type CreateUserData = Partial<User>;
export type UpdateUserData = Partial<Omit<User, "id" | "created_at">>;
