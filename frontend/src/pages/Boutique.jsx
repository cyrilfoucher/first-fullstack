import PageHeader from "../components/common/header/PageHeader.jsx";
import { useState, useEffect, useContext } from "react";
import api from "../api/axios.js";
import CartContext from "../contexts/CartContext.jsx";

function Boutique() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [produits, setProduits] = useState([]);
  const { panier, setPanier } = useContext(CartContext);
  useEffect(() => {
    async function chargerProduits() {
      setError("");
      try {
        setLoading(true);
        const response = await api.get("/produits");
        setProduits(response.data);
      } catch (error) {
        console.log(error);
        setError("Une erreur est survenue lors du chargement");
      } finally {
        setLoading(false);
      }
    }
    chargerProduits();
  }, []);
  if (loading) {
    return <p>Chargement...</p>;
  }
  function ajouterAuPanier(produit) {
    const itemExistant = panier.find((item) => item.produit._id === produit._id);

    if (itemExistant) {
      setPanier(
        panier.map((item) => {
          if (item.produit._id === produit._id) {
            return {
              ...item,
              quantite: item.quantite + 1,
            };
          }

          return item;
        })
      );

      return;
    }

    setPanier([
      ...panier,
      {
        produit,
        quantite: 1,
      },
    ]);
  }
  console.log(panier);
  return (
    <>
      <PageHeader title="Boutique" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center py-12">
        {produits.map((produit) => (
          <div
            key={produit._id}
            className="flex flex-col justify-between border border-amber-800 rounded-2xl m-4 p-4 h-full"
          >
            <h2 className="font-bold text-xl text-amber-800">{produit.titre}</h2>
            <p className="italic h-12">{produit.description}</p>
            <img
              src={produit.image}
              alt={produit.titre}
              className="h-100 w-80 object-cover rounded p-4 mx-auto  "
            />
            <p className="text-lg font-bold">{produit.prix} €</p>
            <button
              onClick={() => ajouterAuPanier(produit)}
              className="rounded-lg p-4 mt-2 hover:scale-105 bg-amber-800"
            >
              Ajouter au panier
            </button>
          </div>
        ))}
        {error && <p className="font semi-bold text-red-500">{error}</p>}
      </div>
    </>
  );
}

export default Boutique;
