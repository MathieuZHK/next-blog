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
      <h5>{reply.user.nickname}</h5>
      <h4>{reply.reply}</h4>
    </li>
  );
}
