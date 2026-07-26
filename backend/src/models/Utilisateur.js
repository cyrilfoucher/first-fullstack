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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
});

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

export default Utilisateur;
