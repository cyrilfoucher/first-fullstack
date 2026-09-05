import { getAdminCommandes, updateStatutCommande } from "../../services/commande.service.js";
import { useState, useEffect } from "react";
import PageHeader from "../../components/common/header/PageHeader.jsx";

function ListeDeCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [statutSelectionne, setStatutSelectionne] = useState({});
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [ordreDate, setOrdreDate] = useState("recentes");
  useEffect(() => {
    async function recupCommandes() {
      const commandes = await getAdminCommandes();
      console.log(commandes);
      console.log(
        commandes.map((c) => ({
          id: c._id,
          statut: c.statut,
        }))
      );
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

      <div className="mx-auto max-w-4xl p-4 sm:p-8">
        <div className="border border-amber-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            <div className="w-full sm:w-96">
              <label className="block font-semibold mb-2">Rechercher un client</label>
              <input
                type="text"
                placeholder="Rechercher"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-800"
              />
            </div>

            <div className="w-full sm:w-64">
              <label className="block font-semibold mb-2">Filtrer par statut</label>
              <select
                value={filtreStatut}
                onChange={(e) => setFiltreStatut(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-800"
              >
                <option value="Tous">Tous</option>
                <option value="En attente de traitement">En attente de traitement</option>
                <option value="En préparation">En préparation</option>
                <option value="Expédiée">Expédiée</option>
                <option value="Livrée">Livrée</option>
                <option value="Annulée">Annulée</option>
              </select>
            </div>
          </div>
          <div className="mt-4 w-full sm:mt-0 sm:w-64">
            <label className="block font-semibold mb-2">Trier par date</label>
            <select
              value={ordreDate}
              onChange={(e) => setOrdreDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-800"
            >
              <option value="recentes">Plus récentes</option>
              <option value="anciennes">Plus anciennes</option>
            </select>
          </div>
        </div>
        {commandes
          .filter((liste) => {
            return liste.utilisateur.email.toLowerCase().includes(recherche.toLowerCase().trim());
          })
          .filter((liste) => {
            if (filtreStatut === "Tous") {
              return true;
            }
            return liste.statut === filtreStatut;
          })
          .sort((a, b) => {
            if (ordreDate === "recentes") {
              return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
          .map((liste) => (
            <div key={liste._id} className="border rounded-xl border-amber-800 shadow-mb mb-6 p-6">
              <div className="flex flex-col gap-4 font-bold sm:flex-row sm:justify-between">
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
                <div className="flex flex-col gap-3">
                  <p>Total: {liste.total.toFixed(2)} €</p>
                  <select
                    value={statutSelectionne[liste._id] || liste.statut}
                    onChange={(event) => changerStatutCommande(event, liste._id)}
                    className="w-full border border-amber-800 rounded-lg px-3 py-2 sm:w-auto"
                  >
                    <option value="En attente de traitement">En attente de traitement</option>
                    <option value="En préparation">En préparation</option>
                    <option value="Expédiée">Expédiée</option>
                    <option value="Livrée">Livrée</option>
                    <option value="Annulée">Annulée</option>
                  </select>
                  <button
                    onClick={() => MettreAJourStatut(liste._id)}
                    className="w-full rounded-lg bg-amber-800 px-4 py-2 text-white transition hover:bg-amber-900 sm:ml-0 sm:w-auto"
                  >
                    Mettre à jour
                  </button>
                </div>
              </div>
              <div className="border border-amber-800 rounded-lg p-4 mt-6">
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
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <img
                        src={detail.produit.image}
                        alt={detail.produit.description}
                        className="w-16 rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-lg ">{detail.produit.titre}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-between">
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
