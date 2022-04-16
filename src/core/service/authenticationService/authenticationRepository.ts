import { RegisterDto } from "../../dto/RegisterDto";
import { SignInDto } from "../../dto/SignInDto";
import { supabase } from "../supabaseService/supabaseClient";

async function signUp(data: RegisterDto) {
  return await supabase.auth.signUp(data);
}

async function signIn(data: SignInDto) {
  return await supabase.auth.signIn(data);
}

async function signOut() {
  return await supabase.auth.signOut();
}

async function signOutServerSide(jwt: string) {
  return await supabase.auth.api.signOut(jwt);
}

async function createAuthUser(data: RegisterDto) {
  return await supabase.auth.api.createUser(data);
}

export const authenticationRepository = {
  signUp,
  signIn,
  signOut,
  signOutServerSide,
  createAuthUser,
};
