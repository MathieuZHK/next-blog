import React from "react";
import { PostDto } from "../../core/dto/PostDto";
import { Post } from "../../core/model/Post";
import { Reply } from "../../core/model/Reply";
import PostItem from "../post-item/PostItem";
import styles from "../post-list/postlist.module.css";

interface PostListProps {
  posts: PostDto[];
  showDelete?: boolean;
  showUpdate?: boolean;
  showReply?: boolean;
  onDelete?: (postId: string) => void;
  onReply: (reply: string, postId: string) => void;
}

export default function PostList(props: PostListProps) {
  const { posts, showDelete, onDelete, showUpdate, showReply, onReply } = props;

  return (
    <div className={styles.container}>
      <ul className={styles.ulNone}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            showDelete={showDelete}
            showUpdate={showUpdate}
            showReply={showReply}
            onDelete={onDelete}
            onReply={onReply}
          />
        ))}
      </ul>
    </div>
  );
}
