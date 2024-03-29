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
    <div className={styles.container}>
      <li key={post.id}>
        <div className={styles.card}>
          <div>
            <label>{post.user.nickname}</label>
          </div>
          <div className={styles.cardPost}>
            <label className={styles.postSummary}>{post.summary}</label>
          </div>
        </div>
        <div>
          {showReply && <ReplyForm onReply={onReply} post={post} />}
          <ReplyList replys={post.reply} />

          {showDelete && (
            <button
              className={styles.buttonDelete}
              type="button"
              onClick={() => onDelete?.(post.id)}
            >
              Supprimer
            </button>
          )}
          {showUpdate && (
            <Link href={`/posts/update/${post.id}`}>
              <a className={styles.buttonUpdate}>Modifier</a>
            </Link>
          )}
        </div>
      </li>
    </div>
  );
}
