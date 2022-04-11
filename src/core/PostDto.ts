export interface PostDto {
  id: string;
  title: string;
  summary: string;
  created_at: string;
}
export type CreatePostData = Partial<PostDto>;
export type UpdatePostData = Partial<Omit<PostDto, "id" | "created_at">>;
