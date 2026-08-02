import mongoose from "mongoose";

const utilisateurSchema = new mongoose.Schema({
  prenom: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

export default Utilisateur;
