import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import Utilisateur from "../models/Utilisateur.js";
import bcrypt from "bcrypt";
import transporter from "./config/mailer.js";

export const register = async (req, res) => {
  const { nom, prenom, email, motDePasse, confirmationMotDePasse } = req.body;
  if (motDePasse !== confirmationMotDePasse) {
    throw new AppError("Les mots de passe ne corréspondent pas", 400);
  }
  const utilisateurExiste = await Utilisateur.findOne({ email });
  if (utilisateurExiste) {
    throw new AppError("Email déjà utilisé", 409);
  }
  const motDePasseHash = await bcrypt.hash(motDePasse, 10);
  await Utilisateur.create({ nom, prenom, email, motDePasse: motDePasseHash });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Création de votre compte utilisateur",
    text: "Votre compte a été créer avec succés",
  });
  return res.status(201).json({ message: "Compte créer avec succés" });
};

export const login = async (req, res) => {
  const { email, motDePasse } = req.body;
  const utilisateur = await Utilisateur.findOne({ email });
  if (!utilisateur) {
    throw new AppError("Aucun utilisateur trouvé", 404);
  }
  const motDePasseValide = await bcrypt.compare(
    motDePasse,
    utilisateur.motDePasse,
  );
  if (!motDePasseValide) {
    throw new AppError("Mauvaise combinaison Email/Mot de passe", 401);
  }
  const token = await jwt.sign(
    {
      id: utilisateur._id,
      email: utilisateur.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
  return res.status(200).json({ message: "connexion réussie", token });
};
