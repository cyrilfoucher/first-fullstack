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
      sparse: true,
    },
    paymentIntentId: {
      type: String,
      default: null,
    },
    statut: {
      type: String,
      required: true,
      default: "Paiement en attente",
      enum: [
        "Paiement en attente",
        "En attente de traitement",
        "En préparation",
        "Expédiée",
        "Livrée",
        "Annulée",
      ],
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "paid", "refunded", "failed"],
    },
  },
  { timestamps: true },
);
export default model("Commande", commandeSchema);
