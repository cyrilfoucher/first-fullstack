import Produits from "../models/Produit.js";
import AppError from "../utils/AppError.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "produits" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      },
    );
    Readable.from(buffer).pipe(stream);
  });
};

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
  const imageUpload = await uploadImage(req.file.buffer);
  const nouveauProduit = await Produits.create({
    titre,
    description,
    prix,
    image: imageUpload.secure_url,
    stock,
  });
  return res.status(201).json({ message: "Produit ajouté", nouveauProduit });
};

export const putProduit = async (req, res) => {
  const id = req.params.id;
  const { titre, description, prix, stock } = req.body;
  const donnees = {
    titre,
    description,
    prix,
    stock,
  };
  if (req.file) {
    const imageUpload = await uploadImage(req.file.buffer);
    donnees.image = imageUpload.secure_url;
  }
  const produit = await Produits.findByIdAndUpdate(id, donnees, {
    returnDocument: "after",
  });
  if (!produit) {
    throw new AppError("Produit introuvable", 404);
  }
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
