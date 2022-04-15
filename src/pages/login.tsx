import { supabase } from "../core/service/supabaseService/supabaseClient";
import NavBar from "../compoments/nav-bar/NavBar";
import LoginForm from "../compoments/login-form/LoginForm";
import { userRepository } from "../core/service/userService/userRepository";
import { useState } from "react";

export default function Login() {
  const [errorAuthMessage, setErrorAuthMessage] = useState("");

  const onLogin = async (email: string, password: string) => {
    const respAuthUser = await supabase.auth.signIn({ email, password });
    if (!respAuthUser.error) {
      const token = respAuthUser.session?.access_token;
      const authUserId = respAuthUser.user?.id;
      const respUser = await userRepository.getUserByAuthUserId(
        authUserId ? authUserId : ""
      );
    } else {
      setErrorAuthMessage(respAuthUser.error.message);
    }
  };

  return (
    <>
      <NavBar />
      {errorAuthMessage && <p>{errorAuthMessage}</p>}
      <LoginForm onLogin={onLogin} />
    </>
  );
}
