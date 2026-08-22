import { useState, useEffect } from "react";
import api from "../api/axios.js";
import PageHeader from "../components/common/header/PageHeader.jsx";
import ModifierCompteForm from "../components/compte/ModifierCompteForm.jsx";
import { Link } from "react-router-dom";

function Compte() {
  const [utilisateur, setUtilisateur] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const chargerCompte = async () => {
      try {
        const response = await api.get("/auth/me");
        setUtilisateur(response.data);
      } catch (error) {
        console.log(error);
        setError("Une erreur est survenue lors du chargement");
      }
    };
    chargerCompte();
  }, []);
  if (error) {
    return (
      <>
        <PageHeader title="Mon compte" />
        <p className="text-red-500">{error}</p>
      </>
    );
  }
  if (!utilisateur) {
    return (
      <>
        <PageHeader title="Mon compte" />
        <p>Chargement de votre compte...</p>
      </>
    );
  }

  const prenom = utilisateur.prenom;
  const nom = utilisateur.nom;
  return (
    <>
      <PageHeader title="Mon compte" />
      {isEditing ? (
        <ModifierCompteForm
          utilisateur={utilisateur}
          onCancel={() => setIsEditing(false)}
          updateUtilisateur={setUtilisateur}
        />
      ) : (
        <div className="flex flex-col mx-auto max-w-md bg-amber-800 rounded-2xl text-center gap-4 p-4 px-6 mb-12 mt-10 py-10">
          <h2 className="text-xl font-bold ">Bonjour {prenom} !</h2>
          <p className="font-bold">Voici tes informations personnelles :</p>
          <p>
            <strong>Prénom:</strong> {prenom}
          </p>
          <p>
            <strong>Nom:</strong> {nom}
          </p>
          <p>
            <strong>Adresse e-mail:</strong> {utilisateur.email}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="border rounded-lg bg-amber-50 p-4 mt-2 "
          >
            Modifier mes informations
          </button>
          <Link to="/mes-commandes" className="border rounded-lg bg-amber-50 p-4 mt-2 ">
            Mes commandes
          </Link>
        </div>
      )}
    </>
  );
}

export default Compte;
