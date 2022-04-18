import { FormEvent, useState } from "react";
import { RegisterDto } from "../../core/dto/RegisterDto";
import styles from "../register-form/registerform.module.css";

interface RegisterFormProps {
  onRegister: (email: string, password: string, nickName: string) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onRegister(email, password, nickName);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formRegister}>
      <input
        placeholder="nickName"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        className={styles.inputText}
      />
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
        INSCRIPTION
      </button>
    </form>
  );
}
