import { getAdminCommandes, updateStatutCommande } from "../../services/commande.service.js";
import { useState, useEffect } from "react";
import PageHeader from "../../components/common/header/PageHeader.jsx";

function ListeDeCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [statutSelectionne, setStatutSelectionne] = useState({});
  useEffect(() => {
    async function recupCommandes() {
      const commandes = await getAdminCommandes();
      setCommandes(commandes);
    }
    recupCommandes();
  }, []);
  function changerStatutCommande(event, idCommande) {
    setStatutSelectionne({ ...statutSelectionne, [idCommande]: event.target.value });
  }
  async function MettreAJourStatut(idCommande) {
    await updateStatutCommande(idCommande, statutSelectionne[idCommande]);
  }

  return (
    <>
      <PageHeader title="Gestion des commandes" />

      <div className="max-w-4xl mw-auto p-8">
        {commandes.map((liste) => (
          <div key={liste._id} className="border rounded-xl border-amber-800 shadow-mb mb-6 p-6">
            <div className="flex justify-between font-bold">
              <div>
                <p>Commande n° {liste._id.slice(0, 8)}</p>
                <p>
                  Date:
                  {new Date(liste.createdAt).toLocaleDateString("fr-FR")} à{" "}
                  {new Date(liste.createdAt).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p>Total: {liste.total.toFixed(2)} €</p>
                <select
                  value={statutSelectionne[liste._id] || liste.statut}
                  onChange={(event) => changerStatutCommande(event, liste._id)}
                  className="border border-amber-800 rounded-lg px-3 py-1"
                >
                  <option value="En attente de traitement">En attente de traitement</option>
                  <option value="En préparation">En préparation</option>
                  <option value="Expédiée">Expédiée</option>
                  <option value="Livrée">Livrée</option>
                </select>
                <button
                  onClick={() => MettreAJourStatut(liste._id)}
                  className=" ml-3 bg-amber-800 text-white px-4 py-2 rounded-lg  hover:bg-amber-900 transition"
                >
                  Mettre à jour
                </button>
              </div>
            </div>
            <div className="border border-amber-800 rounded-lg p-4 mt-4">
              <p className="font-semibold mb-2">Client</p>
              <p>
                <span className="font-semibold">Prenom:</span> {liste.utilisateur.prenom}
              </p>
              <p>
                <span className="font-semibold">Nom:</span> {liste.utilisateur.nom}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {liste.utilisateur.email}
              </p>
            </div>
            <div className="mt-6">
              {liste.produits.map((detail) => (
                <div key={detail._id} className="border border-amber-800 rounded-lg mb-3 p-4">
                  <div className="flex items-start gap-4 ">
                    <img
                      src={detail.produit.image}
                      alt={detail.produit.description}
                      className="w-16 rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-lg ">{detail.produit.titre}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <p>
                      <span className="font-semibold">Quantité:</span>
                      {detail.quantite}
                    </p>
                    <p>
                      <span className="font-semibold">Prix unitaire: </span>
                      {detail.prix.toFixed(2)} €
                    </p>
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

export default ListeDeCommandes;
