import { CreatePostData, Post, UpdatePostData } from "../../entity/Post";
import { supabase } from "../supabaseService/supabaseClient";

async function createPost(data: CreatePostData) {
  return await supabase.from<Post>("post").insert([data]);
}

async function updatePost(postId: string, data: UpdatePostData) {
  return await supabase.from<Post>("post").update(data).match({ id: postId });
}

async function getAllPost() {
  return await supabase.from<Post>("post").select();
}

async function getPostById(postId: string) {
  return await supabase.from<Post>("post").select().eq("id", postId);
}

async function deletePost(postId: string) {
  return await supabase.from<Post>("post").delete().match({ id: postId });
}

export const postRepository = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostById,
};