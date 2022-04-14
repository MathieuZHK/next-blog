import React from "react";
import { Post } from "../../src/core/entity/Post";
import PostItem from "../post-item/PostItem";
import styles from "../post-list/postlist.module.css";

export default function PostList(props: { posts: Post[] }) {
  const { posts } = props;

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
