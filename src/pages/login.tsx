import { supabase } from "../core/service/supabaseService/supabaseClient";
import NavBar from "../../compoments/nav-bar/NavBar";
import LoginForm from "../../compoments/login-form/LoginForm";

export default function Login() {
  const onLogin = async (email: string, password: string) => {
    const response = await supabase.auth.signIn({ email, password });
    console.log(response);
  };

  return (
    <>
      <NavBar />
      <LoginForm onLogin={onLogin} />
    </>
  );
}
