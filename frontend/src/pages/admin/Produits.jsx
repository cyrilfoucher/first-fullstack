import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import PageHeader from "../../components/common/header/PageHeader.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Produits() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function deleteProduit(produit) {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimmer ce produit?");
    if (!confirmation) {
      return;
    }
    try {
      await api.delete(`/produits/${produit._id}`);
      setProduits((listeProduits) => listeProduits.filter((p) => p._id !== produit._id));
      toast.success("Produit supprimé avec succès");
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue");
    }
  }
  useEffect(() => {
    async function chargerProduits() {
      setError("");
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/produits");
        setProduits(response.data);
      } catch (error) {
        console.log(error);
        setError("Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    }
    chargerProduits();
  }, []);
  if (loading) {
    return (
      <>
        {" "}
        <PageHeader title="Produits" />
        <p>Chargement...</p>
      </>
    );
  }
  if (error) {
    return (
      <>
        <PageHeader title="Produits" />
        <p>{error}</p>
      </>
    );
  }
  if (produits.length === 0) {
    return (
      <>
        <PageHeader title="Produits" />
        <p>La liste de produits est vide </p>
      </>
    );
  }
  return (
    <>
      <PageHeader title="Produits" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {produits.map((p) => (
          <div key={p._id} className="flex flex-col border rounded-2xl bg-amber-50 mt-4  ">
            <div className="flex flex-col justify-center items-center  p-4">
              {" "}
              <img src={p.image} alt={p.titre} className=" w-32 h-auto rounded mt-2" />
            </div>
            <div className="flex flex-1 flex-col gap-6 py-3 px-4 ">
              {" "}
              <p className="text-xl font-bold">{p.titre}</p>
              <p>
                Prix: <strong>{p.prix.toFixed(2)}</strong> €
              </p>
              <p>
                Stock: <strong>{p.stock}</strong>
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 pb-6">
              <Link
                to={`/admin/produits/modifier/${p._id}`}
                className="flex border rounded-lg w-40 justify-center bg-amber-800 text-amber-100 hover:bg-amber-700 transition duration-200"
              >
                Modifier
              </Link>
              <button
                type="button"
                onClick={() => deleteProduit(p)}
                className="flex border rounded-lg w-40 justify-center bg-amber-800 text-amber-100  hover:bg-amber-700 transition duration-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Produits;
