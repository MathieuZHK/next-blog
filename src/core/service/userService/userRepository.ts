import { CreateUserData, User, UpdateUserData } from "../../model/User";
import { supabase } from "../supabaseService/supabaseClient";

async function createUser(data: CreateUserData) {
  return await supabase.from<User>("user").insert([data]);
}

async function updateUser(userId: string, data: UpdateUserData) {
  return await supabase.from<User>("user").update(data).match({ id: userId });
}

async function getAllUser() {
  return await supabase.from<User>("user").select();
}

async function getUserById(userId: string) {
  return await supabase.from<User>("user").select().eq("id", userId);
}

async function getUserByAuthUserId(authUserId: string) {
  return await supabase
    .from<User>("user")
    .select()
    .eq("auth_user_id", authUserId);
}

async function deleteUser(userId: string) {
  return await supabase.from<User>("user").delete().match({ id: userId });
}

export const userRepository = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByAuthUserId,
};
