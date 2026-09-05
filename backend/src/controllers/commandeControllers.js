import AppError from "../utils/AppError.js";
import Produit from "../models/Produit.js";
import Commande from "../models/Commande.js";
import Utilisateur from "../models/Utilisateur.js";
import { remboursementStripe } from "../services/stripe.service.js";
import { envoyerMailAnnulationCommande } from "../services/mail.service.js";

export const getCommandes = async (req, res) => {
  const commandes = await Commande.find({
    utilisateur: req.user._id,
  }).populate("produits.produit");

  return res.status(200).json(commandes);
};
export const getToutesCommandes = async (req, res) => {
  const commandes = await Commande.find()
    .populate("produits.produit")
    .populate("utilisateur", "prenom nom email");

  return res.status(200).json(commandes);
};

export const updateStatutCommande = async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;
  const commande = await Commande.findById(id);
  if (!commande) {
    throw new AppError("Commande introuvable", 404);
  }
  commande.statut = statut;
  await commande.save();
  return res.status(200).json(commande);
};

export const annulerCommande = async (req, res) => {
  const { id } = req.params;
  const commande = await Commande.findById(id);
  if (!commande) {
    throw new AppError("Aucune commande trouvée.", 404);
  }
  if (!commande.utilisateur.equals(req.user._id)) {
    throw new AppError(
      "Vous n'êtes pas autorisé à modifier cette commande",
      403,
    );
  }
  if (commande.statut !== "En attente de traitement") {
    throw new AppError("Cette commande ne peut plus être annulée", 400);
  }
  await remboursementStripe(commande.paymentIntentId);

  for (const item of commande.produits) {
    const produit = await Produit.findById(item.produit);
    produit.stock = item.quantite + produit.stock;
    await produit.save();
  }
  commande.statut = "Annulée";
  await commande.save();
  const utilisateur = await Utilisateur.findById(commande.utilisateur);
  try {
    await envoyerMailAnnulationCommande(
      utilisateur.email,
      utilisateur.prenom,
      commande,
    );
  } catch (error) {
    console.error(error);
  }
  return res
    .status(200)
    .json({ message: "Remboursement effectué avec succès" });
};
