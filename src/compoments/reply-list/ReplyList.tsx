import React, { useState } from "react";
import { Reply } from "../../core/model/Reply";
import ReplyItem from "../reply-item/ReplyItem";

interface ReplyListProps {
  replys: Reply[];
}

export default function ReplyList(props: ReplyListProps) {
  const { replys } = props;

  return (
    <>
      {replys && (
        <ul>
          {replys.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </ul>
      )}
    </>
  );
}
