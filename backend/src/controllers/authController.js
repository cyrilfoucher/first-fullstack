import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import Utilisateur from "../models/Utilisateur.js";
import bcrypt from "bcrypt";
import transporter from "../config/mailer.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";

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

export const putMe = async (req, res) => {
  const { prenom, nom, email } = req.body;

  req.user.prenom = prenom;
  req.user.nom = nom;
  req.user.email = email;
  const emailExiste = await Utilisateur.findOne({ email });
  if (emailExiste && !emailExiste._id.equals(req.user._id)) {
    throw new AppError("Un autre compte utilise déjà cette adresse email", 409);
  }
  await req.user.save();
  return res.status(200).json({
    message: "Modifications effectuées avec succés ",
    utilisateur: {
      nom: req.user.nom,
      prenom: req.user.prenom,
      email: req.user.email,
    },
  });
};

export const changePassword = async (req, res) => {
  const { ancienMotDePasse, nouveauMotDePasse } = req.body;
  const verificationMDP = await bcrypt.compare(
    ancienMotDePasse,
    req.user.motDePasse,
  );
  if (!verificationMDP) {
    throw new AppError("Mot de passe incorrect", 401);
  }
  const hashNouveauMDP = await bcrypt.hash(nouveauMotDePasse, 10);
  req.user.motDePasse = hashNouveauMDP;
  await req.user.save();
  return res.status(200).json({ message: "Votre mot de passe a été modifié" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const utilisateur = await Utilisateur.findOne({ email });
  if (!utilisateur) {
    throw new AppError("Aucun compte ne correspond a cette adresse mail", 404);
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  console.log(resetToken);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  utilisateur.resetPasswordToken = resetPasswordToken;
  utilisateur.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await utilisateur.save();
  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: utilisateur.email,
      subject: "Réinitialisation du mot de passe",
      text: `Voici votre lien de réinitialisation valable 15mn : ${resetUrl}`,
    });
  } catch (error) {
    utilisateur.resetPasswordToken = undefined;
    utilisateur.resetPasswordExpire = undefined;
    await utilisateur.save();
    throw new AppError("Impossible d'envoyer l'email de réinitialisation", 500);
  }
  return res
    .status(200)
    .json({ message: "Un email de téinitialisation a été envoyé." });
};
