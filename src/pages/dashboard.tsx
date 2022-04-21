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
import PostForm from "../compoments/post-form/PostForm";
import styles from "../../styles/dashboard.module.css";

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

  const onPostSubmit = async (
    summary: string,
    user_id: string,
    id?: string
  ) => {
    const { data, error } = await postRepository.createPost({
      summary,
      user_id,
    });
    setErrorMessage(error ? error.message : "");
    if (!error) {
      const { data, error } = await postRepository.getAllPost();
      if (data) {
        setPosts(data);
      }
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

  const deletePost = async (postId: string) => {
    const { data, error } = await postRepository.deletePost(postId);
    setErrorMessage(error ? error.message : "");
    if (!error) {
      setPosts((prev) => {
        return prev.filter((item) => item.id != postId);
      });
    }
    const responseData = await postRepository.getPostByUserWithNickname(
      authContext.currentUser?.id ? authContext.currentUser?.id : ""
    );
    const dataAllPostByUser = responseData.body;
    if (dataAllPostByUser) {
      setPosts(dataAllPostByUser);
    } else {
      setPosts([]);
    }
  };

  return (
    <>
      <div className={styles.navbarcontainer}>
        <NavBar />
        <div className={styles.errorcontainer}>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <div className={styles.container}>
          <div className={styles.postformcontainer}>
            <PostForm onPostSubmit={onPostSubmit} />
          </div>
          <div className={styles.postlistallcontainer}>
            <PostList
              posts={posts}
              showReply={authContext.isAuthenticated}
              onReply={onReply}
            />
          </div>
        </div>
      </div>
    </>
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
