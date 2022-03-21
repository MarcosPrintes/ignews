import { loadStripe } from "@stripe/stripe-js";
// Criar a chabve pública do stripe para o frontend
// PARA ACESSAR UMA CHAVE PUBLIC NO NEXT, PRECISA ESTAR COM O PREFIXO "NEXT_PUBLIC"
export async function getStripejs() {
  const stripeJs = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return stripeJs;
}
