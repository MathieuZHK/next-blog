import Link from "next/link";
import React from "react";
import { Post } from "../../src/core/entity/Post";
import styles from "../post-item/postitem.module.css";

export default function PostItem(props: { post: Post }) {
  const { post } = props;

  return (
    <li key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <Link href={`/posts/${post.id}`}>
        <a>
          <h3>Detail</h3>
        </a>
      </Link>
    </li>
  );
}
