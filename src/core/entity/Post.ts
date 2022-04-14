export interface Post {
  id: string;
  title: string;
  summary: string;
  created_at: string;
}
export type CreatePostData = Partial<Post>;
export type UpdatePostData = Partial<Omit<Post, "id" | "created_at">>;
