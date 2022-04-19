import React from "react";
import { Reply } from "../../core/model/Reply";
import styles from "../reply-item/replyitem.module.css";

interface ReplyItemProps {
  reply: Reply;
}

export default function ReplyItem(props: ReplyItemProps) {
  const { reply } = props;

  return (
    <li key={reply.id}>
      <div className={styles.card}>
        <h5>{reply.user.nickname}</h5>
        <div className={styles.cardReply}>
          <h4>{reply.reply}</h4>
        </div>
      </div>
    </li>
  );
}
