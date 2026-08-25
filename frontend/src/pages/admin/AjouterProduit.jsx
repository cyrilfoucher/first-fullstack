import api from "../../api/axios";
import PageHeader from "../../components/common/header/PageHeader";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AjouterProduit() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageRegister = register("image", { required: "Une image doit être jointe" });

  async function onSubmit(data) {
    try {
      setLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("titre", data.titre);
      formData.append("description", data.description);
      formData.append("prix", data.prix);
      formData.append("stock", data.stock);
      formData.append("image", data.image[0]);
      await api.post("/produits", formData);
      toast.success("Produit ajouté avec succès");
      navigate("/admin/produits");
    } catch (error) {
      console.log(error);
      setError("Une erreur est survenue");
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }
  function previewImage(event) {
    const file = event.target.files[0];
    if (!file) {
      setPreview("");
      return;
    }
    setPreview(URL.createObjectURL(file));
  }
  if (loading) {
    return (
      <>
        <PageHeader title="Ajouter un produit" />
        <p>Création du produit en cours...</p>
      </>
    );
  }
  if (error) {
    return (
      <>
        <PageHeader title="Ajouter un produit" />
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Ajouter un produit" />

      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl border rounded-2xl border-amber-800 bg-amber-50 p-8 shadow-lg"
        >
          <div>
            <label htmlFor="titre" className="block mb-2 font-semibold">
              Titre :{" "}
            </label>
            <input
              id="titre"
              {...register("titre", { required: "Le titre est obligatoire" })}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />
            {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 font-semibold">
              Description :{" "}
            </label>
            <textarea
              id="description"
              {...register("description", { required: "La description est obligatoire" })}
              className="w-full border rounded-lg px-3 py-2 h-32 resize-none"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="prix" className="block mb-2 font-semibold">
              Prix :{" "}
            </label>
            <input
              type="number"
              step="0.01"
              id="prix"
              {...register("prix", {
                required: "Le prix est obligatoire",
                min: { value: 0, message: "Le prix doit être supérieur ou égal a 0" },
              })}
              className="w-40 border rounded-lg px-3 py-2"
            />
            {errors.prix && <p className="mt-1 text-sm text-red-600">{errors.prix.message}</p>}
          </div>
          <div>
            <label htmlFor="stock" className="block mb-2 font-semibold">
              Stock :{" "}
            </label>
            <input
              type="number"
              id="stock"
              {...register("stock", {
                required: "Un stock est obligatoire",
                min: { value: 0, message: "Le stock doit être supérieur ou égal à 0" },
              })}
              className="w-40 border rounded-lg px-3 py-2"
            />
            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
          </div>
          <div>
            <label htmlFor="image" className="block mb-2 font-semibold">
              Image :{" "}
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              id="image"
              {...imageRegister}
              onChange={(event) => {
                imageRegister.onChange(event);
                previewImage(event);
              }}
              className="w-full border  rounded-lg px-3 py-2 file:mr-4  file:rounded-lg  file:border-0  file:bg-amber-800  file:px-4   file:py-2  file:text-amber-100 file:hover:bg-amber-700 cursor-pointer"
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>}

            {preview && <img src={preview} alt="aperçu" className="rounded-2xl w-32 h-auto py-4" />}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="w-40 justify-center rounded-xl bg-amber-800 py-2 text-amber-100 hover:bg-amber-700 transition"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AjouterProduit;
