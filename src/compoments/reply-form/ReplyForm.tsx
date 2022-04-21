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
    <div className={styles.container}>
      {replyFormShow ? (
        <div className={styles.formcontainer}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setReply(e.target.value ? e.target.value : "")}
              placeholder="Repondre..."
              className={styles.replyInput}
            ></input>
            <button className={styles.replySubmit} type="submit">
              Envoyer
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setReplyFormShow(true)}
          className={styles.sendSubmit}
        >
          Repondre
        </button>
      )}
    </div>
  );
}
