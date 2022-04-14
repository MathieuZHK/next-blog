import { useState } from "react";
import { postRepository } from "../core/service/postService/postRepository";
import { Post } from "../core/entity/Post";
import { GetServerSideProps } from "next";
import NavBar from "../../compoments/nav-bar/NavBar";
import PostForm from "../../compoments/post-form/PostForm";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState<Post[]>(props.posts);

  const onPostSubmit = async (title: string, summary: string) => {
    const { data, error } = await postRepository.createPost({
      title,
      summary,
    });
    setErrorMessage(error ? error.message : "");
    if (data) {
      setPosts((prev) => [...prev, ...data]);
    }
  };

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

  return (
    <div>
      <NavBar />
      <h1>NEXTJS BLOG</h1>
      <PostList posts={posts} />
    </div>
  );
}
