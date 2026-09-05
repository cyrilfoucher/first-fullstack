import stripe from "../config/stripes.js";
import {
  creerCommande,
  creerCommandeEnAttente,
} from "../services/commande.service.js";
import Produit from "../models/Produit.js";
import AppError from "../utils/AppError.js";

export async function creerSessionPaiement(req, res) {
  const { panier } = req.body;
  const produitsStripe = [];

  for (const item of panier) {
    const produit = await Produit.findById(item.produit);
    if (!produit) {
      throw new AppError("Produit introuvable", 404);
    }
    produitsStripe.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: produit.titre,
          images: [produit.image],
        },
        unit_amount: Math.round(produit.prix * 100),
      },
      quantity: item.quantite,
    });
  }
  const commande = await creerCommandeEnAttente(req.user._id, panier);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: produitsStripe,
    success_url: `${process.env.FRONTEND_URL}/paiement/succes`,
    cancel_url: `${process.env.FRONTEND_URL}/panier`,
    metadata: {
      commandeId: commande._id.toString(),
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
  console.log("Event reçu :", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const paymentIntentId = session.payment_intent;
    const commandeId = session.metadata.commandeId;
    const stripeSessionId = session.id;

    await creerCommande(commandeId, stripeSessionId, paymentIntentId);
  }
  return res.sendStatus(200);
}
