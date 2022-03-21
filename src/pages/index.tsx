import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { GetServerSideProps, GetStaticProps } from "next";
import SubscribeButton from "../components/SubscribeButton";

import styles from "./home.module.scss";
import { stripe } from "../services/stripe";
import api from "../services/api";
import { getStripejs } from "../services/stripe-js";
import { useRouter } from "next/router";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  const { priceId, amount } = product;
  const { data: session, status } = useSession();
  const { push } = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      push("/posts");
      return;
    }

    try {
      // nome do arquivo sempre é o nome da rota
      const resposne = await api.post("/subscribe");

      const { sessionId } = resposne.data;

      const stripeJs = await getStripejs();

      stripeJs.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <Head>
        <title>Ignews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, Welcome </span>
          <h1>
            News about the <span> React </span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {amount} month</span>
          </p>
          <SubscribeButton
            onSubscribeButton={handleSubscribe}
            priceId={priceId}
          />
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
    revalidate: 60 * 60 * 24, // minuto hora dia => 24 horas
  };
};
