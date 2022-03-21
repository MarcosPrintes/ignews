import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { createClient } from "../../../../prismicio";
import styles from "../post.module.scss";

interface PreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Preview({ post }: PreviewProps) {
  const session = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (!session) {
      push(`posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title> {post.title} | ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time> {post.updatedAt} </time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a> Subscribe now 😀 </a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

/**
 * getStaticPaths
 * nos paths, poderia retornar os conteúdos que eu gostaria que fossem gerados em tempo de build,
 * como não estou passando nada, todos pos posts serão carregados no primeiro acesso.
 * Usar o parametro da rota, nesse caso, é o slug
 *
 * Somente para páginas com paramêtros dinâmicos
 *
 * Fallback =>
 *  - true: se tentar acessar um conteúdo que ainda não foi gerado de forma estática, carregue o conteúdo pelo cliente
 *  - false: se o conteúdo não foi gerado de forma estática, retorna 404
 *  - blocking: igual ao true, mas ele tenta carregar o conteúdo mas executa na camada do next (SSR)
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
        },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = createClient();

  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post: post,
    },
  };
};
