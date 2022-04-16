import Link from "next/link";
import React from "react";
import { Post } from "../../core/model/Post";
import styles from "../post-item/postitem.module.css";

interface PostItemProps {
  post: Post;
  showDelete?: boolean;
  showUpdate?: boolean;
  onDelete?: (postId: string) => void;
}

export default function PostItem(props: PostItemProps) {
  const { post, showDelete, onDelete, showUpdate } = props;

  return (
    <li key={post.id}>
      <h1>{post.title}</h1>
      <h3>{post.summary}</h3>
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
