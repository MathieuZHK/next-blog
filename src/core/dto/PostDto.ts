import { Reply } from "../model/Reply";
import { User } from "../model/User";

export interface PostDto {
  id: string;
  title: string;
  summary: string;
  created_at: string;
  user: User;
  reply: Reply[];
}
