import { FormEvent, useState } from "react";
import { PostDto } from "../../core/dto/PostDto";
import { Reply } from "../../core/model/Reply";
import styles from "../reply-form/replyform.module.css";

interface PostItemProps {
  post?: PostDto;
  showDelete?: boolean;
  showUpdate?: boolean;
  showReply?: boolean;
  onDelete?: (postId: string) => void;
  onReply: (reply: string, postId: string) => void;
}
export default function ReplyForm(props: PostItemProps) {
  const [replyFormShow, setReplyFormShow] = useState(false);
  const [reply, setReply] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onReply(reply, props.post?.id ? props.post.id : "");

    setReply("");
    setReplyFormShow(false);
  };

  return (
    <>
      {replyFormShow ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setReply(e.target.value ? e.target.value : "")}
            placeholder="Repondre..."
            className={styles.inputText}
          ></input>
          <button className={styles.myButton} type="submit">
            Envoyer
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setReplyFormShow(true)}
          className={styles.myButton}
        >
          Repondre
        </button>
      )}
    </>
  );
}
