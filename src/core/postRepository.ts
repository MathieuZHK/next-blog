import { CreatePostData, PostDto, UpdatePostData } from "./PostDto";
import { supabase } from "./supabaseClient";

async function createPost(data: CreatePostData) {
  return await supabase.from<PostDto>("post").insert([data]);
}

async function updatePost(postId: string, data: UpdatePostData) {
  return await supabase
    .from<PostDto>("post")
    .update(data)
    .match({ id: postId });
}

async function getAllPost() {
  return await supabase.from<PostDto>("post").select();
}

async function getPostById(postId: string) {
  return await supabase.from<PostDto>("post").select().eq("id", postId);
}

async function deletePost(postId: string) {
  return await supabase.from<PostDto>("post").delete().match({ id: postId });
}

export const postRepository = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostById,
};
