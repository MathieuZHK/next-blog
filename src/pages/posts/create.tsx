import { useRouter } from "next/router";
import { useState } from "react";
import NavBar from "../../compoments/nav-bar/NavBar";
import PostForm from "../../compoments/post-form/PostForm";

import { postRepository } from "../../core/service/postService/postRepository";

export default function Create() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onPostSubmit = async (title: string, summary: string, id?: string) => {
    const { data, error } = await postRepository.createPost({
      title,
      summary,
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
