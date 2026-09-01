import AppError from "../utils/AppError.js";
import Produit from "../models/Produit.js";
import Commande from "../models/Commande.js";

export async function creerCommande(utilisateurId, panier, stripeSessionId) {
  const produitsCommande = [];

  const commandeExistante = await Commande.findOne({
    stripeSessionId,
  });
  if (commandeExistante) {
    return commandeExistante;
  }
  if (!panier || panier.length === 0) {
    throw new AppError("Votre panier est vide", 400);
  }
  for (const item of panier) {
    const produit = await Produit.findById(item.produit._id);
    if (!produit) {
      throw new AppError("Produit introuvable", 404);
    }
    if (produit.stock < item.quantite) {
      throw new AppError("Stock insuffisant", 400);
    }
    produitsCommande.push({
      produit: produit._id,
      quantite: item.quantite,
      prix: produit.prix,
    });
    produit.stock = produit.stock - item.quantite;
    await produit.save();
  }

  const total = produitsCommande.reduce(
    (total, item) => total + item.quantite * item.prix,
    0,
  );

  const commande = await Commande.create({
    utilisateur: utilisateurId,
    produits: produitsCommande,
    total,
    stripeSessionId,
  });
  return commande;
}
