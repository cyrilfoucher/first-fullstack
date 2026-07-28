import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
  .regex(
    /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]'`~]/,
    "Le mot de passe doit contenir au moins un caractère spécial",
  );

export const registerSchema = z
  .object({
    prenom: z
      .string()
      .trim()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne peut pas dépasser 50 caractères"),

    nom: z
      .string()
      .trim()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères"),

    email: z.string().trim().toLowerCase().email("Adresse email invalide"),

    motDePasse: passwordSchema,

    confirmationMotDePasse: z.string(),
  })
  .refine((data) => data.motDePasse === data.confirmationMotDePasse, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmationMotDePasse"],
  });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse email invalide"),

  motDePasse: z.string().min(1, "Le mot de passe est obligatoire"),
});
