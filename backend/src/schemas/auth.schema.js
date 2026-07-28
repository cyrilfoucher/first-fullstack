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

const prenomSchema = z
  .string()
  .trim()
  .min(2, "le prénom doit contenir au moins 2 caractères")
  .max(30, "le prénom ne peut pas contenir plus de 30 caractères");

const nomSchema = z
  .string()
  .trim()
  .min(2, "Le nom doit contenir au moins 2 caractères")
  .max(50, "Le nom ne peut pas dépasser 50 caractères");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Adresse email invalide");

export const registerSchema = z
  .object({
    prenom: prenomSchema,
    nom: nomSchema,
    email: emailSchema,
    motDePasse: passwordSchema,
    confirmationMotDePasse: z.string(),
  })
  .refine((data) => data.motDePasse === data.confirmationMotDePasse, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmationMotDePasse"],
  });

export const loginSchema = z.object({
  email: emailSchema,

  motDePasse: z.string().min(1, "Le mot de passe est obligatoire"),
});

export const putMeSchema = z.object({
  prenom: prenomSchema,
  nom: nomSchema,
  email: emailSchema,
});
