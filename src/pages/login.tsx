import { authenticationRepository } from "../core/service/authenticationService/authenticationRepository";
import NavBar from "../compoments/nav-bar/NavBar";
import LoginForm from "../compoments/login-form/LoginForm";
import { userRepository } from "../core/service/userService/userRepository";
import { useState, useContext } from "react";
import { AuthContext } from "../core/context/AuthContext";
import { useRouter } from "next/router";
import styles from "../compoments/login-form/loginform.module.css";

export default function Login() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [errorAuthMessage, setErrorAuthMessage] = useState("");

  const onLogin = async (email: string, password: string) => {
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
      router.replace("/posts");
    } else {
      setErrorAuthMessage(respAuthUser.error.message);
    }
  };

  return (
    <>
      <div>
        <div className={styles.errorScreen}>
          {errorAuthMessage && <p>{errorAuthMessage}</p>}
        </div>
        <LoginForm onLogin={onLogin} />
      </div>
    </>
  );
}
