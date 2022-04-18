import React, { useState } from "react";
import { Reply } from "../../core/model/Reply";
import ReplyItem from "../reply-item/ReplyItem";
import styles from "../reply-list/replylist.module.css";

interface ReplyListProps {
  replys: Reply[];
}

export default function ReplyList(props: ReplyListProps) {
  const { replys } = props;

  return (
    <>
      {replys && (
        <ul className={styles.ulNone}>
          {replys.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </ul>
      )}
    </>
  );
}
