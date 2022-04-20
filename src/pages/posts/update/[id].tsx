import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { Post } from "../../../core/model/Post";
import { postRepository } from "../../../core/service/postService/postRepository";
import { useContext, useEffect, useState } from "react";
import NavBar from "../../../compoments/nav-bar/NavBar";
import PostForm from "../../../compoments/post-form/PostForm";
import { authenticationRepository } from "../../../core/service/authenticationService/authenticationRepository";
import { AuthContext } from "../../../core/context/AuthContext";
import { userRepository } from "../../../core/service/userService/userRepository";

interface UpdateProps {
  token: string;
}

interface PostProps {
  post?: Post;
}

interface PostUrlQuery extends ParsedUrlQuery {
  id: string;
}

export default function PostPage(props: PostProps) {
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

  const onPostSubmit = async (summary: string) => {
    if (props.post?.id) {
      const { data, error } = await postRepository.updatePost(props.post?.id, {
        summary,
      });
      setErrorMessage(error ? error.message : "");
      if (!error) {
        router.replace("/posts");
      }
    } else {
      setErrorMessage("Le post n'existe pas");
    }
  };

  const onClickBack = () => {
    router.replace("/posts");
  };

  return (
    <>
      <NavBar />
      <h1>Mettre à jour le post</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <PostForm onPostSubmit={onPostSubmit} summary={props.post?.summary} />
      <button type="button" onClick={onClickBack}>
        Retour aux posts
      </button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  PostProps,
  PostUrlQuery,
  UpdateProps
> = async (context) => {
  const token = context.req.cookies["sb-access-token"];
  if (token) {
    const { data, error } = await postRepository.getPostById(
      context.params?.id ?? ""
    );
    return {
      props: {
        post: data ? data[0] : undefined,
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
