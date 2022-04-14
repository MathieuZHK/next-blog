import { FormEvent, useState } from "react";
import { postRepository } from "../core/service/postService/postRepository";
import { Post } from "../core/entity/Post";
import { GetServerSideProps } from "next";
import Link from "next/link";
import NavBar from "../../compoments/nav-bar/NavBar";

interface HomeProps {
  posts: Post[];
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

export default function Home(props: HomeProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState<Post[]>(props.posts);

  const createPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await postRepository.createPost({
      title,
      summary,
    });
    setErrorMessage(error ? error.message : "");
    if (data) {
      setPosts((prev) => [...prev, ...data]);
    }
    setTitle("");
    setSummary("");
  };

  const deletePost = async (postId: string) => {
    const { data, error } = await postRepository.deletePost(postId);
    setErrorMessage(error ? error.message : "");
    if (!error) {
      setPosts((prev) => {
        return prev.filter((item) => item.id != postId);
      });
    }
    const responseData = await postRepository.getAllPost();
    const dataAllPost = responseData.body;
    if (dataAllPost) {
      setPosts(dataAllPost);
    } else {
      setPosts([]);
    }
  };

  return (
    <div>
      <NavBar />
      <h1>NEXTJS BLOG</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form
        onSubmit={createPost}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "408px",
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      <hr />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <Link href={`/posts/${post.id}`}>
              <a>
                <h3>Detail</h3>
              </a>
            </Link>
            <button type="button" onClick={(e) => deletePost(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
