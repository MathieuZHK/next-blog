import { FormEvent, useState } from "react";
import styles from "../post-form/postform.module.css";

interface PostFormProps {
  title?: string;
  summary?: string;
  onPostSubmit: (title: string, summary: string) => void;
}

export default function PostForm(props: PostFormProps) {
  const [title, setTitle] = useState(props.title ? props.title : "");
  const [summary, setSummary] = useState(props.summary ? props.summary : "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onPostSubmit(title, summary);
    setTitle("");
    setSummary("");
  };

  return (
    <>
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
        />
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}
