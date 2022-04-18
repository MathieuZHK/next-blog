import { Post } from "./Post";
import { User } from "./User";

export interface Reply {
  id: string;
  reply: string;
  user_id: string;
  post_id: string;
  created_at: string;
  user: User;
}

export type CreateReplyData = Partial<Omit<Reply, "user">>;
export type UpdateReplyData = Partial<Omit<Reply, "id" | "created_at">>;
