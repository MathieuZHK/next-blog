import React from "react";
import { Reply } from "../../core/model/Reply";
import styles from "../reply-item/replyitem.module.css";

interface ReplyItemProps {
  reply: Reply;
}

export default function ReplyItem(props: ReplyItemProps) {
  const { reply } = props;

  return (
    <div key={reply.id} className={styles.container}>
      <li>
        <div className={styles.card}>
          <div>
            <label>{reply.user.nickname}</label>
          </div>
          <div className={styles.cardReply}>
            <label>{reply.reply}</label>
          </div>
        </div>
      </li>
    </div>
  );
}
