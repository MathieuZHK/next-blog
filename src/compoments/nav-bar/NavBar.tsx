import React, { useContext, useEffect, useState } from "react";
import styles from "../nav-bar/navbar.module.css";
import Link from "next/link";
import { AuthContext } from "../../core/context/AuthContext";
import { useRouter } from "next/router";
import { authenticationRepository } from "../../core/service/authenticationService/authenticationRepository";
import { userRepository } from "../../core/service/userService/userRepository";
import { User } from "../../core/model/User";
import PostForm from "../post-form/PostForm";

export default function NavBar() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [userAuth, setUserAuth] = useState<User[]>([]);

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      const session = authenticationRepository.getUserSession();
      if (!session) {
        router.replace("/");
      } else {
        authContext.saveToken(session.access_token);
        getUserById(session.user?.id ? session.user.id : "");
      }
    }
  }, []);

  const getUserById = async (userId: string) => {
    const { data, error } = await userRepository.getUserById(userId);
    if (
      data !== null &&
      data !== undefined &&
      data !== null &&
      data.length > 0
    ) {
      authContext.setCurrentUser(data[0]);
    }
  };

  const onLogOut = () => {
    authContext.logout();
    router.replace("/");
  };

  return (
    <>
      <div id="container" className={styles.container}>
        <div className={styles.aNickname}>
          <h3>
            Bonjour{" "}
            {authContext.currentUser?.nickname
              ? authContext.currentUser?.nickname
              : ""}
          </h3>
        </div>
        <div id="start">
          <Link href={"/dashboard"}>
            <a className={styles.aUser}>Accueil</a>
          </Link>
        </div>
        {authContext.isAuthenticated && (
          <div id="myspace">
            <Link href={"/posts"}>
              <a className={styles.aUser}>Mon espace</a>
            </Link>
          </div>
        )}
        <div id="center" className={styles.divCenter}></div>
        {authContext.isAuthenticated && (
          <div id="end">
            <button className={styles.myButton} onClick={onLogOut}>
              Déconnexion
            </button>
          </div>
        )}
        {!authContext.isAuthenticated && (
          <div id="end">
            <Link href={"/login"}>
              <a className={styles.myButton}>Connexion</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
