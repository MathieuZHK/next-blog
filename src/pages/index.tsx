import { postRepository } from "../core/service/postService/postRepository";
import { Post } from "../core/model/Post";
import { GetServerSideProps } from "next";
import NavBar from "../compoments/nav-bar/NavBar";
import PostList from "../compoments/post-list/PostList";
import { useContext, useEffect } from "react";
import { AuthContext } from "../core/context/AuthContext";
import { useRouter } from "next/router";

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
  const authContext = useContext(AuthContext);
  const router = useRouter();

  return (
    <div>
      <NavBar />
      <h1>NEXTJS BLOG</h1>
      <PostList posts={props.posts} />
    </div>
  );
}
