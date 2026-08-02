import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  actif: {
    type: Boolean,
    default: true,
  },
});

const Produit = mongoose.model("Produit", produitSchema);
export default Produit;
