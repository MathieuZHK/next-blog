import { GetServerSideProps } from "next";
import { useState } from "react";

import { useRouter } from "next/router";
import { Post } from "../../core/entity/Post";
import { postRepository } from "../../core/service/postService/postRepository";
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

export default function Index(props: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(props.posts);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const deletePost = async (postId: string) => {
    const { data, error } = await postRepository.deletePost(postId);
    setErrorMessage(error ? error.message : "");
    if (!error) {
      setPosts((prev) => {
        return prev.filter((item) => item.id != postId);
      });
    }
    const responseData = await postRepository.getAllPost();
    const dataAllPost = responseData.body;
    if (dataAllPost) {
      setPosts(dataAllPost);
    } else {
      setPosts([]);
    }
  };
  const clickCreate = () => {
    router.replace("/posts/create");
  };

  return (
    <>
      <NavBar />
      <h1>NEXTJS BLOG</h1>
      <hr />
      <button type="button" onClick={clickCreate}>
        Créer un post
      </button>
      <PostList posts={posts} showDelete showUpdate onDelete={deletePost} />
    </>
  );
}
