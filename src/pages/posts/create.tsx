import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NavBar from "../../compoments/nav-bar/NavBar";
import PostForm from "../../compoments/post-form/PostForm";
import { AuthContext } from "../../core/context/AuthContext";

import { postRepository } from "../../core/service/postService/postRepository";

export default function Create() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    !authContext.isAuthenticated ? router.replace("/") : "";
  }, []);

  const onPostSubmit = async (
    title: string,
    summary: string,
    user_id: string,
    id?: string
  ) => {
    const { data, error } = await postRepository.createPost({
      title,
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
      <h1>Creer un post</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <PostForm onPostSubmit={onPostSubmit} />
      <button type="button" onClick={onClickBack}>
        Retour aux posts
      </button>
    </>
  );
}
