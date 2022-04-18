import Link from "next/link";
import React, { useState } from "react";
import { PostDto } from "../../core/dto/PostDto";
import styles from "../post-item/postitem.module.css";
import ReplyForm from "../reply-form/ReplyForm";
import ReplyList from "../reply-list/ReplyList";

interface PostItemProps {
  post: PostDto;
  showDelete?: boolean;
  showUpdate?: boolean;
  showReply?: boolean;
  onDelete?: (postId: string) => void;
  onReply: (reply: string, postId: string) => void;
}

export default function PostItem(props: PostItemProps) {
  const { post, showDelete, onDelete, showUpdate, showReply, onReply } = props;
  console.log(post);
  return (
    <li key={post.id}>
      <h2>{post.user.nickname} A DIT :</h2>
      <h3>{post.summary}</h3>
      <ReplyList replys={post.reply} />
      {showReply && <ReplyForm onReply={onReply} post={post} />}

      {showDelete && (
        <button type="button" onClick={() => onDelete?.(post.id)}>
          Supprimer
        </button>
      )}
      {showUpdate && (
        <Link href={`/posts/update/${post.id}`}>
          <a>Modifier</a>
        </Link>
      )}
    </li>
  );
}
