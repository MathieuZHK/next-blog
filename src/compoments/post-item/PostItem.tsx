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
  return (
    <div>
      <li key={post.id}>
        <div className={styles.cardPost}>
          <h4 className={styles.cardNickname}>{post.user.nickname}</h4>
          <h3>{post.summary}</h3>
        </div>
        <div>
          {showReply && <ReplyForm onReply={onReply} post={post} />}
          <ReplyList replys={post.reply} />

          {showDelete && (
            <button
              className={styles.myButton}
              type="button"
              onClick={() => onDelete?.(post.id)}
            >
              Supprimer
            </button>
          )}
          {showUpdate && (
            <Link href={`/posts/update/${post.id}`}>
              <a className={styles.myButton}>Modifier</a>
            </Link>
          )}
        </div>
      </li>
    </div>
  );
}
