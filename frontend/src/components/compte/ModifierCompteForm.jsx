import { useForm } from "react-hook-form";
import api from "../../api/axios.js";
import { useState } from "react";

function ModifierCompteForm({ utilisateur, onCancel, updateUtilisateur }) {
  const { register, handleSubmit } = useForm({
    defaultValues: utilisateur,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    try {
      setError("");
      setLoading(true);
      const response = await api.put("/auth/me", data);
      updateUtilisateur(response.data.utilisateur);
      onCancel();
    } catch (error) {
      setError("Une erreur est survenue");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mx-auto max-w-md bg-amber-800 rounded-2xl text-center  p-4 px-5 py-10 mb-12 gap-4"
    >
      <label htmlFor="prenom">
        <strong>Prénom :</strong>
      </label>
      <input
        type="text"
        id="prenom"
        placeholder="Modifier le prénom"
        {...register("prenom")}
        className="bg-white text-center rounded-2xl  "
      />
      <label htmlFor="nom">
        <strong>Nom :</strong>
      </label>
      <input
        type="text"
        id="nom"
        placeholder="Modifier le nom"
        {...register("nom")}
        className="bg-white text-center rounded-2xl  "
      />
      <label htmlFor="email">
        <strong>E-mail :</strong>
      </label>
      <input
        type="email"
        id="email"
        placeholder="Modifier l'e-mail"
        {...register("email")}
        className="bg-white text-center rounded-2xl "
      />

      <button type="submit" disabled={loading} className="border rounded-lg bg-amber-50 p-4 mt-2 ">
        {loading ? "Modification..." : "Modifier"}
      </button>
      <button type="button" className="border rounded-lg bg-amber-50 p-4 mt-2 " onClick={onCancel}>
        Annuler
      </button>
      {error && <p clasName="text-red-500">{error}</p>}
    </form>
  );
}
export default ModifierCompteForm;
