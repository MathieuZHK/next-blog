import { FormEvent, useState } from "react";
import { RegisterDto } from "../../src/core/dto/RegisterDto";
import styles from "../register-form/registerform.module.css";

interface RegisterFormProps {
  onRegister: (email: string, password: string) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onRegister(email, password);
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
        INSCRIPTION
      </button>
    </form>
  );
}
