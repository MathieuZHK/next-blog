import { useState } from "react";
import { postRepository } from "../core/service/postService/postRepository";
import { Post } from "../core/entity/Post";
import { GetServerSideProps } from "next";
import NavBar from "../../compoments/nav-bar/NavBar";
import PostList from "../../compoments/post-list/PostList";

interface HomeProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const { data } = await postRepository.getAllPost();
  return {
    props: {
      posts: data ?? [],
    },
  };
};

export default function Home(props: HomeProps) {
  return (
    <div>
      <NavBar />
      <h1>NEXTJS BLOG</h1>
      <PostList posts={props.posts} />
    </div>
  );
}
