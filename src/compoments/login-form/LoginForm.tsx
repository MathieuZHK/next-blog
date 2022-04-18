import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "../login-form/loginform.module.css";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
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
    <form onSubmit={handleSubmit} className={styles.formLogin}>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputText}
      />
      <input
        placeholder="password"
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.inputText}
      />
      <button type="submit" className={styles.myButton}>
        SE CONNECTER
      </button>
      <button type="button" className={styles.myButton} onClick={onSubscribe}>
        INSCRIPTION
      </button>
    </form>
  );
}
