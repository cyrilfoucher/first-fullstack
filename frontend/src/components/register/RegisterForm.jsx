import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./RegisterSchema.js";
import api from "../../api/axios.js";

function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await api.post("/auth/register", data);
      setMessage("Votre inscription est réussie");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center  gap-4 p-4 rounded-2xl bg-amber-800 shadow"
    >
      <label htmlFor="prenom">Prénom:</label>
      <input
        type="text"
        id="prenom"
        placeholder="Saisir un prénom..."
        {...register("prenom")}
        className="border rounded bg-amber-50 px-3 py-2"
      />
      {errors.prenom && (
        <p className="border bg-red-600 rounded text-white text-center">{errors.prenom.message}</p>
      )}

      <label htmlFor="nom">Nom:</label>
      <input
        type="text"
        id="nom"
        placeholder="Saisir un nom..."
        {...register("nom")}
        className="border rounded bg-amber-50 px-3 py-2"
      />
      {errors.nom && (
        <p className="border bg-red-600 rounded text-white text-center">{errors.nom.message}</p>
      )}

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        placeholder="Saisir un email..."
        {...register("email")}
        className="border rounded bg-amber-50 px-3 py-2"
      />
      {errors.email && (
        <p className="border bg-red-600 rounded text-white text-center">{errors.email.message}</p>
      )}

      <label htmlFor="motDePasse">Mot de passe:</label>
      <input
        type="password"
        id="motDePasse"
        placeholder="Saisir un mot de passe..."
        {...register("motDePasse")}
        className="border rounded bg-amber-50 px-3 py-2"
      />
      {errors.motDePasse && (
        <p className="border bg-red-600 rounded text-white text-center">
          {errors.motDePasse.message}
        </p>
      )}

      <label htmlFor="confirmationMotDePasse">Confirmer le mot de passe:</label>
      <input
        type="password"
        id="confirmationMotDePasse"
        placeholder="Confirmer le mot de passe..."
        {...register("confirmationMotDePasse")}
        className="border rounded bg-amber-50 px-3 py-2"
      />
      {errors.confirmationMotDePasse && (
        <p className="border bg-red-600 rounded text-white text-center">
          {errors.confirmationMotDePasse.message}
        </p>
      )}

      <label className="flex justify-center items-center gap-2 mt-2">
        <input type="checkbox" {...register("confirmation")} />
        Confirmer les données saisies
      </label>
      {errors.confirmation && (
        <p className="border bg-red-600 rounded text-white text-center">
          {errors.confirmation.message}
        </p>
      )}
      {error && <p className="border bg-red-600 rounded text-white text-center">{error}</p>}
      {message && <p className="border bg-green-500 rounded text-white text-center">{message}</p>}

      <button type="submit" disabled={loading} className="border rounded-lg bg-amber-50 p-4 mt-2">
        {loading ? "Envoi des données" : "Envoyer"}
      </button>
    </form>
  );
}

export default RegisterForm;
