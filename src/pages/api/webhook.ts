import { stripe } from "./../../services/stripe";
import { NextApiResponse, NextApiRequest } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { saveSubscription } from "./_lib/manageSubscriptions";

async function buffer(redable: Readable) {
  const chunks = [];

  for await (const chunk of redable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

/**
 * Por padrão o next tem uma forma de entender uma requisição, como se ela viesse como um json, ou formulário
 * Mas nessa caso, a requisição vem como uma stream (Readable)
 * Essa configuração desabilita a configuração padrão que o next tem para entender as requests
 * https://nextjs.org/docs/api-routes/api-middlewares
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.deleted",
  "customer.subscription.updated",
]);

export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    const buff = await buffer(request);

    // obtém o secret que o stripe envia
    const secret = request.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buff,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      return response.status(400).send(`Webhook error: ${error.message}`);
    }

    const type = event.type;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );
            break;
          case "customer.subscription.created":
          case "customer.subscription.deleted":
          case "customer.subscription.updated":
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              subscription.customer.toString(),
              type === "customer.subscription.created"
            );
            break;

          default:
            throw new Error(
              "STRIPE ERROR => Unhadled event from stripe webhook"
            );
        }
      } catch (error) {
        return response.json({ error: "Webhook handler failed" });
      }
    }
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
}
