import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "../login-form/loginform.module.css";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

export default function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin(email, password);
  };

  const onSubscribe = () => {
    router.replace("/register");
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <form onSubmit={handleSubmit} className={styles.login}>
            <span className={styles.logo}>WoE</span>
            <div className={styles.loginField}>
              <div className={styles.loading}>
                {props.isLoading && <label>CHARGEMENT...</label>}
              </div>
              <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.loginInput}
              />
              <input
                placeholder="password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.loginInput}
              />
              <button type="submit" className={styles.loginSubmit}>
                SE CONNECTER
              </button>
              <button
                type="button"
                className={styles.loginSubmit}
                onClick={onSubscribe}
              >
                INSCRIPTION
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
