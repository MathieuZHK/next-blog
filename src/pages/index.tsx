import { authenticationRepository } from "../core/service/authenticationService/authenticationRepository";
import LoginForm from "../compoments/login-form/LoginForm";
import { userRepository } from "../core/service/userService/userRepository";
import { useState, useContext } from "react";
import { AuthContext } from "../core/context/AuthContext";
import { useRouter } from "next/router";
import styles from "../compoments/login-form/loginform.module.css";
import { supabase } from "../core/service/supabaseService/supabaseClient";

export default function Login() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [errorAuthMessage, setErrorAuthMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  supabase.auth.onAuthStateChange(async (event, session) => {
    const userAuth = authenticationRepository.getAuthUser();
    if (userAuth) {
      await fetch("/api/auth/set", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      });
    }
  });

  const onLogin = async (email: string, password: string) => {
    setIsLoading(true);
    var respAuthUser = await authenticationRepository.signIn({
      email,
      password,
    });
    if (!respAuthUser.error) {
      const authUserId = respAuthUser.user?.id;
      var respUser = await userRepository.getUserByAuthUserId(
        authUserId ? authUserId : ""
      );
      if (
        respUser !== undefined &&
        respUser.data !== undefined &&
        respUser.data !== null &&
        respUser.data.length > 0
      ) {
        authContext.setCurrentUser(respUser.data[0]);
        const token = authenticationRepository.getUserSession()?.access_token;
        if (token !== undefined) {
          authContext.saveToken(token);
        }
      }

      router.replace("/dashboard");
      setIsLoading(false);
    } else {
      setErrorAuthMessage(respAuthUser.error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className={styles.errorScreen}>
          {errorAuthMessage && <p>{errorAuthMessage}</p>}
        </div>
        <LoginForm onLogin={onLogin} isLoading={isLoading} />
      </div>
    </>
  );
}
