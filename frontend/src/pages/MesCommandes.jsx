import { useState, useEffect } from "react";
import { getCommandes } from "../services/commande.service.js";
import PageHeader from "../components/common/header/PageHeader.jsx";

function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  useEffect(() => {
    async function chargerCommandes() {
      const commandes = await getCommandes();
      setCommandes(commandes);
    }
    chargerCommandes();
  }, []);
  return (
    <>
      <PageHeader title="Mes commandes" />

      <div className="max-w-3xl mx-auto p-8">
        {commandes.map((p) => (
          <div
            key={p._id}
            className="border-2 border-amber-800 rounded-xl shadow-md mb-6 p-6 space-y-1"
          >
            <p>Commande n° {p._id.slice(0, 8)}</p>

            <p>
              Date {new Date(p.createdAt).toLocaleDateString("fr-FR")} à{" "}
              {new Date(p.createdAt).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="flex justify-between">
              <p>
                Total <span className="font-bold">{p.total.toFixed(2)} €</span>
              </p>
              <span className="border rounded-full bg-amber-200 text-amber-800  px-4 mx-5 ">
                Statut: <span className="font-bold">{p.statut}</span>
              </span>
            </div>
            <div className="mt-8">
              {p.produits.map((listeP) => (
                <div key={listeP._id} className="border border-amber-800 rounded-lg p-4 mb-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={listeP.produit.image}
                      alt={listeP.produit.description}
                      className="w-24 h-27 object-cover rounded-md"
                    />
                    <div className="flex-1 ml-4">
                      <p className="font-semibold mb-2">{listeP.produit.titre}</p>

                      <div className="flex justify-between  items-end mt-3">
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
