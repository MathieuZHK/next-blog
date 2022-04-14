import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect } from "react";
import NavBar from "../../../compoments/nav-bar/NavBar";
import { Post } from "../../core/entity/Post";
import { postRepository } from "../../core/service/postService/postRepository";

interface PostProps {
  post?: Post;
}

interface PostUrlQuery extends ParsedUrlQuery {
  id: string;
}

export default function PostPage(props: PostProps) {
  return (
    <>
      <NavBar />
      <div>
        <h1>{props.post?.title}</h1>
        <h3>{props.post?.summary}</h3>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  PostProps,
  PostUrlQuery
> = async (context) => {
  const { data, error } = await postRepository.getPostById(
    context.params?.id ?? ""
  );
  return {
    props: {
      post: data ? data[0] : undefined,
    },
  };
};
