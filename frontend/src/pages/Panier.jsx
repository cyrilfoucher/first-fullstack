import { useContext, useState } from "react";
import CartContext from "../contexts/CartContext";
import PageHeader from "../components/common/header/PageHeader";
import { commande } from "../services/commande.service.js";
import { toast } from "react-toastify";

function Panier() {
  const { panier, removeProduit, deleteProduit, ajouterAuPanier, clearPanier } =
    useContext(CartContext);
  const [loadingCommande, setLoadingCommande] = useState(false);

  const prixTotal = panier.reduce((total, item) => total + item.produit.prix * item.quantite, 0);
  if (panier.length === 0) {
    return (
      <>
        <PageHeader title="Mon panier" />
        <div className="max-w-5xl mx-auto py-20 text-center">
          <h2 className="text-3xl font-bold">Votre panier est vide</h2>
          <p className="mt-4 text-gray-500">Ajoutez des guides depuis la boutique.</p>
        </div>
      </>
    );
  }
  async function commander() {
    try {
      setLoadingCommande(true);
      await commande({ panier: panier });
      clearPanier();
      toast.success("Commande enregistrée");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Veuillez vous connecter pour passer une commande.");
      } else {
        toast.error(error.response?.data?.message || "Une erreur est survenue.");
      }
    } finally {
      setLoadingCommande(false);
    }
  }
  function supprimerProduit(produit) {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit du panier ?"
    );
    if (!confirmation) return;
    deleteProduit(produit);
  }
  function viderPanier() {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir vider le panier ?");

    if (!confirmation) return;

    clearPanier();
  }

  return (
    <>
      <PageHeader title="Mon panier" />

      <div className="max-w-5xl mx-auto p-8">
        {panier.map((item) => (
          <div
            key={item.produit._id}
            className="flex flex-col md:flex-row items-center justify-between border rounded-xl shadow-md p-6 mb-6 gap-6"
          >
            <img
              src={item.produit.image}
              alt={item.produit.description}
              className="w-32 h-40 object-cover rounded-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{item.produit.titre}</h2>
              <p className="text-lg font-semibold text-amber-800 mt-2">
                {item.produit.prix.toFixed(2)} €
              </p>
              <p className="mt-4">
                Quantité : <strong>{item.quantite}</strong>
              </p>
              <p className="mt-2">
                Sous-total : <strong>{(item.quantite * item.produit.prix).toFixed(2)} €</strong>
              </p>
            </div>
            <div className="flex gap-3 md:flex-col">
              <button
                onClick={() => ajouterAuPanier(item.produit)}
                className="w-10 h-10 rounded bg-amber-800 text-white hover:bg-amber-700"
              >
                +
              </button>
              <button
                onClick={() => removeProduit(item.produit)}
                className="w-10 h-10 rounded bg-amber-800 text-white hover:bg-amber-700"
              >
                -
              </button>
              <button
                onClick={() => supprimerProduit(item.produit)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
        <div className="border-t pt-8 mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl font-bold">Total : {prixTotal.toFixed(2)} €</h2>
          <div className="flex gap-4">
            <button
              onClick={viderPanier}
              className="px-6 py-3 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Vider le panier
            </button>
            <button
              onClick={commander}
              disabled={loadingCommande}
              className="px-6 py-3 rounded bg-amber-800 text-white hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loadingCommande ? "Commande en cours..." : "Commander"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Panier;
