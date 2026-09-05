import AppError from "../utils/AppError.js";
import Produit from "../models/Produit.js";
import Commande from "../models/Commande.js";
import Utilisateur from "../models/Utilisateur.js";
import { envoyerMailConfirmationCommande } from "./mail.service.js";

export async function creerCommande(
  commandeId,
  stripeSessionId,
  paymentIntentId,
) {
  const commande = await Commande.findById(commandeId);
  if (!commande) {
    throw new AppError("Aucune commande trouvé.", 404);
  }

  for (const item of commande.produits) {
    const produit = await Produit.findById(item.produit);
    if (!produit) {
      throw new AppError("Produit introuvable", 404);
    }
    if (produit.stock < item.quantite) {
      throw new AppError("Stock insuffisant", 400);
    }
    produit.stock -= item.quantite;
    await produit.save();
  }

  commande.stripeSessionId = stripeSessionId;
  commande.paymentIntentId = paymentIntentId;
  commande.paymentStatus = "paid";
  commande.statut = "En attente de traitement";
  await commande.save();

  const utilisateur = await Utilisateur.findById(commande.utilisateur);
  await envoyerMailConfirmationCommande(
    utilisateur.email,
    utilisateur.prenom,
    commande,
  );
  return commande;
}

export async function creerCommandeEnAttente(utilisateurId, panier) {
  const produitsCommande = [];

  if (!panier || panier.length === 0) {
    throw new AppError("Votre panier est vide", 400);
  }
  for (const item of panier) {
    const produit = await Produit.findById(item.produit);
    if (!produit) {
      throw new AppError("Produit introuvable", 404);
    }
    if (produit.stock < item.quantite) {
      throw new AppError("Stock insuffisant", 400);
    }
    produitsCommande.push({
      produit: produit._id,
      titre: produit.titre,
      image: produit.image,
      prix: produit.prix,
      quantite: item.quantite,
    });
  }

  const total = produitsCommande.reduce(
    (total, item) => total + item.quantite * item.prix,
    0,
  );

  const commande = await Commande.create({
    statut: "Paiement en attente",
    paymentStatus: "pending",
    utilisateur: utilisateurId,
    produits: produitsCommande,
    total,
  });
  return commande;
}
