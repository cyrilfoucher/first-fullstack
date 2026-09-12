import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import Utilisateur from "../models/Utilisateur.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../services/mail.service.js";
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

  await sendEmail({
    to: email,
    subject: "Création de votre compte utilisateur",
    text: `Bonjour ${prenom},

Votre compte Autour du Monde a été créé avec succès.

Vous pouvez désormais vous connecter à votre espace personnel pour découvrir nos guides de voyage et suivre vos futures commandes.

Merci de votre confiance.

L'équipe Autour du Monde`,

    html: `<!DOCTYPE html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;">

<div style="background:#92400e;color:#ffffff;padding:25px;text-align:center;">
<h2 style="margin:0;">🌍 Autour du Monde</h2>
</div>

<div style="padding:40px;">

<h1 style="margin-top:0;color:#92400e;text-align:center;">Bienvenue sur Autour du Monde</h1>

<p style="line-height:1.7;">
Bonjour <strong>${prenom}</strong>,<br><br>

Votre compte a été créé avec succès.<br><br>

Vous pouvez dès maintenant vous connecter à votre espace personnel pour découvrir notre sélection de guides de voyage, gérer vos commandes et préparer vos prochaines destinations.
</p>

<div style="margin-top:35px;border:1px solid #e5e7eb;border-radius:8px;padding:20px;background:#fafafa;">
<h3 style="margin-top:0;color:#92400e;">Votre compte est prêt</h3>

<p>✔️ Accédez à votre espace personnel</p>
<p>✔️ Consultez notre catalogue de guides</p>
<p>✔️ Suivez facilement vos commandes</p>
</div>

<div style="text-align:center;margin-top:40px;">
<a href="${process.env.FRONTEND_URL}/connexion"
style="display:inline-block;background:#92400e;color:#ffffff;text-decoration:none;padding:16px 34px;border-radius:8px;font-size:17px;font-weight:bold;">
Se connecter
</a>
</div>

<hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;">

<p style="text-align:center;color:#6b7280;font-size:14px;">
Merci de votre confiance et bienvenue dans la communauté <strong>Autour du Monde</strong>.<br><br>

<strong>Autour du Monde</strong><br>
Vos guides de voyage numériques
</p>

</div>

</div>
</body>
</html>`,
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
  return res
    .status(200)
    .json({ message: "connexion réussie", token, role: utilisateur.role });
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
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  utilisateur.resetPasswordToken = resetPasswordToken;
  utilisateur.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await utilisateur.save();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  try {
    await sendEmail({
      to: email,
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
    .json({ message: "Un email de réinitialisation a été envoyé." });
};

export const resetPassword = async (req, res) => {
  const token = req.params.token;
  const { nouveauMotDePasse } = req.body;
  const verification = crypto.createHash("sha256").update(token).digest("hex");
  const utilisateur = await Utilisateur.findOne({
    resetPasswordToken: verification,
  });
  if (!utilisateur || utilisateur.resetPasswordExpire <= Date.now()) {
    throw new AppError(
      "Le lien de réinitialisation est invalide ou a expiré",
      400,
    );
  }
  const motDePasseHash = await bcrypt.hash(nouveauMotDePasse, 10);
  utilisateur.motDePasse = motDePasseHash;
  utilisateur.resetPasswordToken = undefined;
  utilisateur.resetPasswordExpire = undefined;
  await utilisateur.save();
  return res.status(201).json({ message: "Mot de pass modifier" });
};
