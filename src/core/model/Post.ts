import { Reply } from "./Reply";
import { User } from "./User";

export interface Post {
  id: string;
  summary: string;
  user_id: string;
  created_at: string;
  user: User;
}
export type CreatePostData = Partial<Omit<Post, "user">>;
export type UpdatePostData = Partial<Omit<Post, "id" | "created_at" | "user">>;
