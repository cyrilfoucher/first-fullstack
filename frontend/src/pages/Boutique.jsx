import PageHeader from "../components/common/header/PageHeader.jsx";
import { useState, useEffect, useContext } from "react";
import api from "../api/axios.js";
import CartContext from "../contexts/CartContext.jsx";

function Boutique() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [produits, setProduits] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const { ajouterAuPanier } = useContext(CartContext);
  useEffect(() => {
    async function chargerProduits() {
      setError("");
      try {
        setLoading(true);
        const response = await api.get("/produits", { params: { page: page, limit: limit } });
        setProduits(response.data.produits);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
        setError("Une erreur est survenue lors du chargement");
      } finally {
        setLoading(false);
      }
    }
    chargerProduits();
  }, [page, limit]);
  if (loading) {
    return <p>Chargement...</p>;
  }
  if (error) {
    return <p className="font semibold text-red-500">{error}</p>;
  }
  if (produits.length === 0) {
    return <p>Aucun produit disponible</p>;
  }
  return (
    <>
      <PageHeader title="Boutique" />
      <div className="flex items-center justify-center p-6">
        <label className="mr-2 text-2xl text-amber-800">Produits par page :</label>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border rounded px-3 py-2"
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={32}>32</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center py-12">
        {produits.map((produit) => (
          <div
            key={produit._id}
            className="flex flex-col justify-between border border-amber-800 rounded-2xl m-4 p-4 h-full"
          >
            <h2 className="font-bold text-xl text-amber-800">{produit.titre}</h2>
            <p className="italic min-h-12">{produit.description}</p>
            <img
              src={produit.image}
              alt={produit.titre}
              className="mx-auto h-96 w-full max-w-80 rounded object-cover p-4 transition duration-300 hover:scale-105"
            />
            <p className="text-xl font-bold text-amber-800">{produit.prix.toFixed(2)} €</p>
            <button
              onClick={() => ajouterAuPanier(produit)}
              className=" w-full rounded-lg text-white p-4 mt-2 hover:scale-105 bg-amber-800 transition duration-300"
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-centers justify-center gap-4 mt-8 p-6">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-4 py-2 bg-amber-800 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Début
        </button>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-amber-800 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <p>
          {page} sur {totalPages}
        </p>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-amber-800 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          suivant
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-amber-800 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Fin
        </button>
      </div>
    </>
  );
}

export default Boutique;
