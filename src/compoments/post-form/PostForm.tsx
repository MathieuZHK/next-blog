import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../core/context/AuthContext";
import styles from "../post-form/postform.module.css";
import { authenticationRepository } from "../../core/service/authenticationService/authenticationRepository";

interface PostFormProps {
  summary?: string;
  user_id?: string;
  onPostSubmit: (summary: string, user_id: string) => void;
}

export default function PostForm(props: PostFormProps) {
  const [summary, setSummary] = useState(props.summary ? props.summary : "");
  const authContext = useContext(AuthContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onPostSubmit(
      summary,
      authContext.currentUser?.id ? authContext.currentUser?.id : ""
    );
    setSummary("");
  };

  return (
    <>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.formStyle}>
          <div className={styles.inputcontainer}>
            <input
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={styles.titleInput}
            />
          </div>
          <div>
            <button type="submit" className={styles.buttonSubmit}>
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
