import { useState, useEffect } from "react";
import { getCommandes, annulerCommande } from "../services/commande.service.js";
import PageHeader from "../components/common/header/PageHeader.jsx";

function MesCommandes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [commandes, setCommandes] = useState([]);

  async function chargerCommandes() {
    try {
      setLoading(true);

      const commandes = await getCommandes();
      setCommandes(commandes);
    } catch (error) {
      console.log(error);
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    chargerCommandes();
  }, []);
  async function handleAnnulerCommande(id) {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir annuler cette commande ? Cette action est irréversible et votre paiement sera remboursé."
    );

    if (!confirmation) {
      return;
    }
    await annulerCommande(id);
    chargerCommandes();
  }
  if (loading) {
    return <p>Chargement...</p>;
  }
  if (error) {
    return (
      <>
        <PageHeader title="Mes commandes" />
        <p className="text-red-500">{error}</p>
      </>
    );
  }
  if (commandes.length === 0) {
    return (
      <>
        <PageHeader title="Mes commandes" />
        <p className="text-center py-32 text-xl text-amber-800">Aucune commande pour le moment</p>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Mes commandes" />

      <div className="max-w-3xl mx-auto p-4 sm:p-8">
        {commandes.map((commande) => (
          <div
            key={commande._id}
            className="border-2 border-amber-800 rounded-xl shadow-md mb-6 p-4 sm:p-6 space-y-3"
          >
            <p>Commande n° {commande._id.slice(0, 8)}</p>

            <p>
              Date {new Date(commande.createdAt).toLocaleDateString("fr-FR")} à{" "}
              {new Date(commande.createdAt).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <p>
                Total <span className="font-bold">{commande.total.toFixed(2)} €</span>
              </p>

              <span className="self-start border rounded-full bg-amber-200 text-amber-800 px-4 py-1 sm:self-auto sm:mx-0">
                {commande.statut}
              </span>
              {commande.statut === "En attente de traitement" && (
                <button
                  onClick={() => handleAnnulerCommande(commande._id)}
                  className="self-start border rounded-full bg-white text-amber-800 px-4 py-1 sm:self-auto sm:mx-0"
                >
                  Annuler la commande
                </button>
              )}
            </div>
            <div className="mt-8">
              {commande.produits.map((listeP) => (
                <div key={listeP._id} className="border border-amber-800 rounded-lg p-4 mb-3">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={listeP.produit.image}
                      alt={listeP.produit.description}
                      className="w-24 h-28 object-cover rounded-md"
                    />
                    <div className="flex-1 sm:ml-4">
                      <p className="font-semibold mb-2">{listeP.produit.titre}</p>

                      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-end mt-3">
                        <p>
                          Quantité <span className="font-bold">{listeP.quantite}</span>
                        </p>
                        <p>
                          Prix <span className="font-bold">{listeP.prix.toFixed(2)} €</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MesCommandes;
