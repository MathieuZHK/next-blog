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
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <form onSubmit={handleSubmit} className={styles.register}>
            <span className={styles.logo}>WoE</span>
            <div className={styles.registerField}>
              <input
                placeholder="nickName"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                className={styles.registerInput}
              />
              <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.registerInput}
              />
              <input
                placeholder="password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.registerInput}
              />
              <button type="submit" className={styles.registerSubmit}>
                INSCRIPTION
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
