import { authenticationRepository } from "../core/service/authenticationService/authenticationRepository";
import NavBar from "../compoments/nav-bar/NavBar";
import LoginForm from "../compoments/login-form/LoginForm";
import { userRepository } from "../core/service/userService/userRepository";
import { useState, useContext } from "react";
import { AuthContext } from "../core/context/AuthContext";
import { useRouter } from "next/router";

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
      var token = respAuthUser.session?.access_token
        ? respAuthUser.session.access_token
        : "";

      const authUserId = respAuthUser.user?.id;
      var respUser = await userRepository.getUserByAuthUserId(
        authUserId ? authUserId : ""
      );
      authContext.saveToken(token);
      if (
        respUser !== undefined &&
        respUser.data !== undefined &&
        respUser.data !== null &&
        respUser.data.length > 0
      ) {
        authContext.setCurrentUser(respUser.data[0]);
      }
      router.replace("/posts");
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
