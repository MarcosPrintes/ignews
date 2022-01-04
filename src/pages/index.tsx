import Head from "next/head";
import { GetServerSideProps, GetStaticProps } from "next";
import SubscribeButton from "../components/SubscribeButton";

import styles from "./home.module.scss";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  const { priceId, amount } = product;
  return (
    <>
      <Head>
        <title>Ignews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏`` Hey, Welcome </span>
          <h1>
            News about the <span> React </span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {amount} month</span>
          </p>
          <SubscribeButton priceId={priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KBNjrFXveRfISRQxrxsrZml", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 // minuto hora dia => 24 horas
  };
};
