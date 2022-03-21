import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";

import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title> Post | ignews </title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#d">
            <time> 12 de março de 2022 </time>
            <strong> Creating a monorepo with Lerna & yarn workspace </strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
              praesentium! Voluptatem minus deleniti expedita nemo veniam, magni
              quos necessitatibus esse quasi ipsa fugiat explicabo ullam et
              rerum, similique eos labore!
            </p>
          </a>
          <a href="#d">
            <time> 12 de março de 2022 </time>
            <strong> Creating a monorepo with Lerna & yarn workspace </strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
              praesentium! Voluptatem minus deleniti expedita nemo veniam, magni
              quos necessitatibus esse quasi ipsa fugiat explicabo ullam et
              rerum, similique eos labore!
            </p>
          </a>
          <a href="#d">
            <time> 12 de março de 2022 </time>
            <strong> Creating a monorepo with Lerna & yarn workspace </strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
              praesentium! Voluptatem minus deleniti expedita nemo veniam, magni
              quos necessitatibus esse quasi ipsa fugiat explicabo ullam et
              rerum, similique eos labore!
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  // const response = await prismic
  //   .get
  //   // Prismic.predicate.at("document.type", "publication")
  //   ();

  return {
    props: {},
  };
};
