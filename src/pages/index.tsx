import { postRepository } from "../core/service/postService/postRepository";
import { GetServerSideProps } from "next";
import NavBar from "../compoments/nav-bar/NavBar";
import PostList from "../compoments/post-list/PostList";
import { useContext, useState } from "react";
import { AuthContext } from "../core/context/AuthContext";
import { PostDto } from "../core/dto/PostDto";
import { replyRepository } from "../core/service/replyService/replyRepository";

interface HomeProps {
  posts: PostDto[];
}

export default function Home(props: HomeProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState(props.posts);
  const authContext = useContext(AuthContext);

  const onReply = async (reply: string, postId: string) => {
    const { data, error } = await replyRepository.createReply({
      reply: reply,
      user_id: authContext.currentUser?.id,
      post_id: postId,
    });
    setErrorMessage(error ? error.message : "");
    if (!error) {
      const { data, error } = await postRepository.getAllPost();
      if (data) {
        setPosts(data);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <h1>XPRESSION</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <PostList
        posts={posts}
        showReply={authContext.isAuthenticated}
        onReply={onReply}
      />
    </div>
  );
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
