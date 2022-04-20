import { authenticationRepository } from "../core/service/authenticationService/authenticationRepository";
import { userRepository } from "../core/service/userService/userRepository";
import { RoleEnum } from "../core/enum/RoleEnum";
import RegisterForm from "../compoments/register-form/RegisterForm";
import NavBar from "../compoments/nav-bar/NavBar";
import { useState } from "react";
import { ApiError } from "@supabase/supabase-js";
import styles from "../compoments/register-form/registerform.module.css";
import { useRouter } from "next/router";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onRegister = async (
    email: string,
    password: string,
    nickName: string
  ) => {
    const { user, error } = await authenticationRepository.signUp({
      email: email,
      password: password,
    });
    setErrorMessage(error?.message ? error.message : "");
    if (!errorMessage) {
      const { data, error } = await userRepository.createUser({
        id: user?.id,
        nickname: nickName,
        role: RoleEnum.USER,
      });
      if (data) {
        router.replace("/login");
      }
    }
  };

  return (
    <>
      {errorMessage && (
        <div className={styles.errorScreen}> {errorMessage}</div>
      )}
      <RegisterForm onRegister={onRegister} />
    </>
  );
}
