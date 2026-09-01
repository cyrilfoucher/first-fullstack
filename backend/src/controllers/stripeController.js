import stripe from "../config/stripes.js";
import { creerCommande } from "../services/commande.service.js";
import AppError from "../utils/AppError.js";

export async function creerSessionPaiement(req, res) {
  const { panier } = req.body;
  const produitsStripe = panier.map((item) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.produit.titre,
          images: [item.produit.image],
        },
        unit_amount: Math.round(item.produit.prix * 100),
      },
      quantity: item.quantite,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: produitsStripe,
    success_url: `${process.env.FRONTEND_URL}/paiement/succes`,
    cancel_url: `${process.env.FRONTEND_URL}/panier`,
    metadata: {
      utilisateurId: req.user._id.toString(),
      panier: JSON.stringify(panier),
    },
  });
  return res.status(200).json({
    url: session.url,
  });
}

export async function webhookStripe(req, res) {
  const signature = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const utilisateurId = session.metadata.utilisateurId;
    const panier = JSON.parse(session.metadata.panier);
    const stripeSessionId = session.id;

    await creerCommande(utilisateurId, panier, stripeSessionId);
  }
  return res.sendStatus(200);
}
