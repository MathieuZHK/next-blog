import { supabase } from "../core/service/supabaseService/supabaseClient";
import { RegisterDto } from "../core/dto/RegisterDto";
import RegisterForm from "../../compoments/register-form/RegisterForm";
import NavBar from "../../compoments/nav-bar/NavBar";

export default function Register() {
  const onRegister = async (email: string, password: string) => {
    const response = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(response);
  };

  return (
    <>
      <NavBar />
      <RegisterForm onRegister={onRegister} />
    </>
  );
}
