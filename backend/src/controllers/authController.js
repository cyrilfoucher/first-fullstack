import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import Utilisateur from "../models/Utilisateur.js";
import bcrypt from "bcrypt";
import transporter from "../config/mailer.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { nom, prenom, email, motDePasse } = req.body;
  const utilisateurExiste = await Utilisateur.findOne({ email });
  if (utilisateurExiste) {
    throw new AppError("Email déjà utilisé", 409);
  }
  const motDePasseHash = await bcrypt.hash(motDePasse, 10);
  const utilisateur = await Utilisateur.create({
    nom,
    prenom,
    email,
    motDePasse: motDePasseHash,
  });
  const token = generateToken(utilisateur);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Création de votre compte utilisateur",
    text: `${prenom} votre compte a été créer avec succés`,
  });
  return res.status(201).json({ message: "Compte créer avec succés", token });
};

export const login = async (req, res) => {
  const { email, motDePasse } = req.body;
  const utilisateur = await Utilisateur.findOne({ email });
  if (!utilisateur) {
    throw new AppError("Mauvaise combinaison Email/Mot de passe", 401);
  }
  const motDePasseValide = await bcrypt.compare(
    motDePasse,
    utilisateur.motDePasse,
  );
  if (!motDePasseValide) {
    throw new AppError("Mauvaise combinaison Email/Mot de passe", 401);
  }
  const token = generateToken(utilisateur);
  return res.status(200).json({ message: "connexion réussie", token });
};

export const getMe = (req, res) => {
  return res.status(200).json({
    nom: req.user.nom,
    prenom: req.user.prenom,
    email: req.user.email,
  });
};
