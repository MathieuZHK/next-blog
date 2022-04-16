import React from "react";
import { Post } from "../../core/model/Post";
import PostItem from "../post-item/PostItem";
import styles from "../post-list/postlist.module.css";

interface PostListProps {
  posts: Post[];
  showDelete?: boolean;
  showUpdate?: boolean;
  onDelete?: (postId: string) => void;
}

export default function PostList(props: PostListProps) {
  const { posts, showDelete, onDelete, showUpdate } = props;

  return (
    <ul>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          showDelete={showDelete}
          showUpdate={showUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
