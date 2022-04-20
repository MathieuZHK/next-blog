import { postRepository } from "../core/service/postService/postRepository";
import { GetServerSideProps } from "next";
import NavBar from "../compoments/nav-bar/NavBar";
import PostList from "../compoments/post-list/PostList";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../core/context/AuthContext";
import { PostDto } from "../core/dto/PostDto";
import { replyRepository } from "../core/service/replyService/replyRepository";
import { useRouter } from "next/router";
import { authenticationRepository } from "../core/service/authenticationService/authenticationRepository";
import { User } from "../core/model/User";
import { userRepository } from "../core/service/userService/userRepository";
import { supabase } from "../core/service/supabaseService/supabaseClient";

interface HomeProps {
  posts: PostDto[];
  token: string;
}

export default function Home(props: HomeProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState(props.posts);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      const session = authenticationRepository.getUserSession();
      if (!session) {
        router.replace("/");
      } else {
        authContext.saveToken(session.access_token);
        getUserById(session.user?.id ? session.user.id : "");
      }
    }
  }, []);

  const getUserById = async (userId: string) => {
    const { data, error } = await userRepository.getUserById(userId);
    if (
      data !== null &&
      data !== undefined &&
      data !== null &&
      data.length > 0
    ) {
      authContext.setCurrentUser(data[0]);
    }
  };

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
  const token = context.req.cookies["sb-access-token"];
  if (token) {
    return {
      props: {
        posts: data ?? [],
        token: token,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};