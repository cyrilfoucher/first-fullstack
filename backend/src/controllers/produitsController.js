import Produits from "../models/Produit.js";
import AppError from "../utils/AppError.js";
import cloudinary from "../config/cloudinary.js";

export const getProduits = async (req, res) => {
  const liste = await Produits.find();
  return res.status(200).json(liste);
};

export const getProduit = async (req, res) => {
  const id = req.params.id;
  const produit = await Produits.findById(id);
  if (!produit) {
    throw new AppError("Aucun produit correspondant a votre recherche", 404);
  }
  return res.status(200).json(produit);
};

export const postProduit = async (req, res) => {
  const { titre, description, prix, stock } = req.body;
  if (!req.file) {
    throw new AppError("Une image est obligatoire", 400);
  }
  const nouveauProduit = await Produits.create({
    titre,
    description,
    prix,
    image,
    stock,
  });
  return res.status(201).json({ message: "Produit ajouté", nouveauProduit });
};

export const putProduit = async (req, res) => {
  const id = req.params.id;
  const { titre, description, prix, image, stock } = req.body;
  const produit = await Produits.findByIdAndUpdate(
    id,
    { titre, description, prix, image, stock },
    { new: true },
  );
  produit.titre = titre;
  produit.description = description;
  produit.prix = prix;
  produit.image = image;
  produit.stock = stock;
  return res.status(200).json({ message: "Produit Modifié", produit });
};

export const deleteProduit = async (req, res) => {
  const id = req.params.id;
  const produitSupprime = await Produits.findByIdAndDelete(id);
  if (!produitSupprime) {
    throw new AppError("Aucun produit trouvé", 404);
  }
  return res.status(200).json({ message: "Produit supprimé", produitSupprime });
};
