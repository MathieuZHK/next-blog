export interface Reply {
  id: string;
  reply: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export type CreateReplyData = Partial<Reply>;
export type UpdateReplyData = Partial<Omit<Reply, "id" | "created_at">>;
