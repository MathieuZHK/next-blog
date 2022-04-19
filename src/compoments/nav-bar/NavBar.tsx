import React, { useContext, useState } from "react";
import styles from "../nav-bar/navbar.module.css";
import Link from "next/link";
import { AuthContext } from "../../core/context/AuthContext";
import { useRouter } from "next/router";

export default function NavBar() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const onLogOut = () => {
    authContext.logout();
    router.replace("/login");
  };

  return (
    <>
      <div id="container" className={styles.container}>
        <div id="start">
          <Link href={"/"}>
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
        {authContext.isAuthenticated == false && (
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
