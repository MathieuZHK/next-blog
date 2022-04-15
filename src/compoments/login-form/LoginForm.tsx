import { FormEvent, useState } from "react";
import styles from "loginform.module.css";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "408px",
      }}
    >
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        style={{
          width: "408px",
          height: "25px",
        }}
      >
        LOG IN
      </button>
    </form>
  );
}
