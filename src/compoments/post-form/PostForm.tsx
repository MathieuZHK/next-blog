import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../core/context/AuthContext";
import styles from "../post-form/postform.module.css";

interface PostFormProps {
  title?: string;
  summary?: string;
  user_id?: string;
  onPostSubmit: (title: string, summary: string, user_id: string) => void;
}

export default function PostForm(props: PostFormProps) {
  const [title, setTitle] = useState(props.title ? props.title : "");
  const [summary, setSummary] = useState(props.summary ? props.summary : "");
  const authContext = useContext(AuthContext);
  const userId = authContext.currentUser?.id;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onPostSubmit(title, summary, userId ? userId : "");
    setTitle("");
    setSummary("");
  };

  return (
    <>
      <div className={styles.card}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "408px",
          }}
        >
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
          />
          <input
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={styles.titleInput}
          />
          <button type="submit" className={styles.buttonSubmit}>
            Enregistrer
          </button>
        </form>
      </div>
    </>
  );
}
