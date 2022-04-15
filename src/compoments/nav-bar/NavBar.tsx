import React from "react";
import styles from "../nav-bar/navbar.module.css";
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <div id="container" className={styles.container}>
        <div id="start">
          <Link href={"/"}>
            <a className={styles.aUser}>Accueil</a>
          </Link>
        </div>
        <div id="center" className={styles.divCenter}>
          <Link href={"/register"}>
            <a className={styles.aUser}>Inscription</a>
          </Link>
        </div>
        <div id="end">
          <Link href={"/login"}>
            <a className={styles.aUser}>Connexion</a>
          </Link>
        </div>
      </div>
    </>
  );
}
