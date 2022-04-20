import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postRepository } from "../../core/service/postService/postRepository";
import NavBar from "../../compoments/nav-bar/NavBar";
import PostList from "../../compoments/post-list/PostList";
import { AuthContext } from "../../core/context/AuthContext";
import { PostDto } from "../../core/dto/PostDto";
import styles from "../../compoments/post-form/postform.module.css";
import { authenticationRepository } from "../../core/service/authenticationService/authenticationRepository";
import { User } from "../../core/model/User";
import { userRepository } from "../../core/service/userService/userRepository";
import { GetServerSideProps } from "next";

interface PostsProps {
  token: string;
}

export default function Index(props: PostsProps) {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
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
        getPostFromUser(session.user?.id ? session.user.id : "");
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

  const getPostFromUser = async (userId: string) => {
    const { data, error } = await postRepository.getPostByUserWithNickname(
      userId
    );
    setPosts(data ? data : []);
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

  const clickCreate = () => {
    router.replace("/posts/create");
  };

  const onReply = () => {
    // Nothing here
  };

  return (
    <>
      <NavBar />

      <button
        type="button"
        onClick={clickCreate}
        className={styles.buttonSubmit}
      >
        Créer un post
      </button>
      <div>
        <PostList
          posts={posts}
          showDelete
          showUpdate
          onDelete={deletePost}
          onReply={onReply}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async (
  context
) => {
  const token = context.req.cookies["sb-access-token"];
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    return {
      props: {
        token: token,
      },
    };
  }
};
