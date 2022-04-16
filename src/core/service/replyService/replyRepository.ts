import { CreateReplyData, Reply, UpdateReplyData } from "../../model/Reply";
import { supabase } from "../supabaseService/supabaseClient";

async function createReply(data: CreateReplyData) {
  return await supabase.from<Reply>("reply").insert([data]);
}

async function updateReply(replyId: string, data: UpdateReplyData) {
  return await supabase
    .from<Reply>("reply")
    .update(data)
    .match({ id: replyId });
}

async function getAllReply() {
  return await supabase.from<Reply>("reply").select();
}

async function getReplyById(replyId: string) {
  return await supabase.from<Reply>("reply").select().eq("id", replyId);
}

async function deleteReply(replyId: string) {
  return await supabase.from<Reply>("reply").delete().match({ id: replyId });
}

export const replyRepository = {
  createReply,
  getAllReply,
  updateReply,
  deleteReply,
  getReplyById,
};
