import AppError from "../utils/AppError.js";
import Produit from "../models/Produit.js";
import Commande from "../models/Commande.js";

export const createCommande = async (req, res) => {
  const { panier } = req.body;
  const produitsCommande = [];
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
    utilisateur: req.user._id,
    produits: produitsCommande,
    total,
  });
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
