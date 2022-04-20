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

export default function Index() {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    authContext.isAuthenticated ? "" : router.replace("/login");
    if (authContext.currentUser) {
      getPostFromUser(
        authContext.currentUser.id ? authContext.currentUser.id : ""
      );
    }
  }, []);

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
