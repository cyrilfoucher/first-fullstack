import bcrypt from "bcrypt";
import transporter from "./config/mailer.js";
export const register = asyncHandler(async (req, res) => {
  const { nom, prenom, email, motDePasse, confirmationMotDePasse } = req.body;
  const utilisateurExiste = await Utilisateur.findOne({ email });
  if (utilisateurExiste) {
    return res.status(409).json({ message: "Email déjà utilisé" });
  }
  const motdePasseHash = await bcrypt.hash(motDePasse, 10);
  await Utilisateur.create({ nom, prenom, email, motDePasse: motdePasseHash });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Création de votre compte utilisateur",
    text: "Votre compte a été créer avec succés",
  });
  return res.status(201).json({ message: "Compte créer avec succés" });
});
