import stripe from "../config/stripes.js";

export async function remboursementStripe(paymentIntentId) {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
  });
}
