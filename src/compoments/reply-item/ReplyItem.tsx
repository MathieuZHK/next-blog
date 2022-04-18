import React from "react";
import { Reply } from "../../core/model/Reply";

interface ReplyItemProps {
  reply: Reply;
}

export default function ReplyItem(props: ReplyItemProps) {
  const { reply } = props;

  return (
    <li key={reply.id}>
      <h4>{reply.user.nickname} A REPONDU :</h4>
      <h5>{reply.reply}</h5>
    </li>
  );
}
