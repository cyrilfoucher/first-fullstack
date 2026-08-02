import { z } from "zod";

export const createProduitSchema = z.object({
  titre: z
    .string()
    .trim()
    .min(1, "Le titre est obligatoire.")
    .max(40, "Le titre ne peut dépasser 40 caractères."),
  description: z
    .string()
    .min(15, "Description minimum de 15 caractères.")
    .max(2000, "La description ne peut pas dépasser 2000 caractères."),
  stock: z.number().min(0, "Le stock ne peut pas être negatif."),
  prix: z.number().positive("Le prix doit être positif."),
});

export const updateProduitSchema = createProduitSchema;
