import PageHeader from "../../components/common/header/PageHeader";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function ModifierProduit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [produit, setProduit] = useState({});
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    async function chargerProduit() {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/produits/${id}`);
        setProduit(response.data);
      } catch (error) {
        console.log(error);
        setError("Une erreur est survenue");
        toast.error("Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    }
    chargerProduit();
  }, [id]);
  useEffect(() => {
    reset(produit);
  }, [produit, reset]);
  if (loading) {
    return (
      <>
        {" "}
        <PageHeader title="Modifer produit" />
        <p>Chargement en cours..</p>
      </>
    );
  }
  async function onSubmit(data) {
    try {
      setLoading(true);
      setError("");
      await api.put(`/produits/${id}`, data);
      toast.success("Produit modifié avec succès");
      navigate("/admin/produits");
    } catch (error) {
      console.log(error);
      setError("Une erreur est survenue");
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }
  if (error) {
    return (
      <>
        <PageHeader title="Modifier produit" />
        <p>{error}</p>
      </>
    );
  }
  return (
    <>
      <PageHeader title="Modifier produit" />
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
              {...register("titre")}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 font-semibold">
              Description :{" "}
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full border rounded-lg px-3 py-2 h-32 resize-none"
            />
          </div>
          <div>
            <label htmlFor="prix" className="block mb-2 font-semibold">
              Prix :{" "}
            </label>
            <input
              type="number"
              step="0.01"
              id="prix"
              {...register("prix")}
              className="w-40 border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-2 font-semibold">
              Stock :{" "}
            </label>
            <input
              type="number"
              id="stock"
              {...register("stock")}
              className="w-40 border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-2 font-semibold">
              Image :{" "}
            </label>
            <input
              id="image"
              {...register("image")}
              className="w-full border rounded-lg px-3 py-2 mb-6"
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="w-40 justify-center rounded-xl bg-amber-800 py-2 text-amber-100 hover:bg-amber-700 transition"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModifierProduit;
