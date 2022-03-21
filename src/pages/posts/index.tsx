import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { RichText } from "prismic-dom";

import { createClient } from "../../../prismicio";
// import { getPrismicClient } from "../../services/prismic";

import styles from "./styles.module.scss";

type PostsProps = {
  posts: Post[];
};

type Post = { slug: string; title: string; excerpt: string; updatedAt: string };

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title> Post | ignews </title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(({ excerpt, slug, title, updatedAt }) => (
            <Link href={`/posts/${slug}`} key={slug}>
              <a>
                <time> {updatedAt} </time>
                <strong> {title} </strong>
                <p>{excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();

  const response = await prismic.getAllByType("post", {
    fetch: ["post.title", "post.text", "post.content"],
    pageSize: 10,
  });

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
