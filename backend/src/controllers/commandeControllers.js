import AppError from "../utils/AppError.js";
import Produit from "../models/Produit.js";
import Commande from "../models/Commande.js";

export const createCommande = async (req, res) => {
  const { panier } = req.body;

  const commande = await creerCommande(req.user._id, panier);
  return res
    .status(201)
    .json({ message: "Votre commande a bien été prise en compte", commande });
};
export const getCommandes = async (req, res) => {
  const commandes = await Commande.find({
    utilisateur: req.user._id,
  }).populate("produits.produit");
  if (commandes.length === 0) {
    return res.status(200).json({ commandes });
  }
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
