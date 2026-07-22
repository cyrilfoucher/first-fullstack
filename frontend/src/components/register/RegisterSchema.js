import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
  .regex(
    /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/,
    "Le mot de passe doit contenir au moins un caractère spécial"
  );

export const registerSchema = z
  .object({
    prenom: z.string().trim().min(1, "le prénom est obligatoire"),
    nom: z.string().trim().min(1, "Le nom est obligatoire"),
    email: z
      .string()
      .trim()
      .min(1, "une adresse email est requise")
      .email("L'adresse email n'est pas valide"),
    motDePasse: passwordSchema,
    confirmationMotDePasse: passwordSchema,
    confirmation: z.literal(true, { error: "Vous devez confirmer les données saisies" }),
  })
  .refine((data) => data.motDePasse === data.confirmationMotDePasse, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmationMotDePasse"],
  });
