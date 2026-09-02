import { Schema, model } from "mongoose";

const commandeSchema = new Schema(
  {
    utilisateur: {
      type: Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
    produits: [
      {
        produit: {
          type: Schema.Types.ObjectId,
          ref: "Produit",
          required: true,
        },
        titre: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        quantite: {
          type: Number,
          required: true,
          min: 1,
        },
        prix: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    stripeSessionId: {
      type: String,
      unique: true,
    },
    statut: {
      type: String,
      required: true,
      default: "En attente de traitement",
    },
  },
  { timestamps: true },
);
export default model("Commande", commandeSchema);
