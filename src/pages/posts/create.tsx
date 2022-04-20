import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NavBar from "../../compoments/nav-bar/NavBar";
import PostForm from "../../compoments/post-form/PostForm";
import { AuthContext } from "../../core/context/AuthContext";
import { postRepository } from "../../core/service/postService/postRepository";
import styles from "../../compoments/post-form/postform.module.css";
import { authenticationRepository } from "../../core/service/authenticationService/authenticationRepository";
import { userRepository } from "../../core/service/userService/userRepository";
import { GetServerSideProps } from "next";

interface CreateProps {
  token: string;
}

export default function Create(props: CreateProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const authContext = useContext(AuthContext);

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
      router.replace("/posts");
    }
  };

  const onClickBack = () => {
    router.replace("/posts");
  };

  return (
    <>
      <NavBar />
      <button
        type="button"
        onClick={onClickBack}
        className={styles.buttonSubmit}
      >
        Retour aux posts
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      <PostForm onPostSubmit={onPostSubmit} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CreateProps> = async (
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
