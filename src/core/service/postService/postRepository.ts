import { PostDto } from "../../dto/PostDto";
import { CreatePostData, Post, UpdatePostData } from "../../model/Post";
import { supabase } from "../supabaseService/supabaseClient";

async function createPost(data: CreatePostData) {
  return await supabase.from<Post>("post").insert([data]);
}

async function updatePost(postId: string, data: UpdatePostData) {
  return await supabase.from<Post>("post").update(data).match({ id: postId });
}

async function getAllPost() {
  return await supabase
    .from<PostDto>("post")
    .select(
      "id, summary, user!post_user_id_fkey(nickname), created_at, reply!reply_post_id_fkey(reply, created_at, user!reply_user_id_fkey(nickname))"
    )
    .order("created_at", { ascending: false });
}

async function getPostByUser(userId: string) {
  return await supabase
    .from<Post>("post")
    .select()
    .match({ user_id: userId })
    .order("created_at", { ascending: false });
}

async function getPostById(postId: string) {
  return await supabase.from<Post>("post").select().eq("id", postId);
}

async function deletePost(postId: string) {
  return await supabase.from<Post>("post").delete().match({ id: postId });
}

async function getPostByUserWithNickname(userId: string) {
  return await supabase
    .from<PostDto>("post")
    .select("id, summary, user!post_user_id_fkey(nickname), created_at")
    .match({ user_id: userId });
}

export const postRepository = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostById,
  getPostByUser,
  getPostByUserWithNickname,
};
