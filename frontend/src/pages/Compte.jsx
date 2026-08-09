import { useState, useEffect } from "react";
import api from "../api/axios.js";
import PageHeader from "../components/common/header/PageHeader.jsx";

function Compte() {
  const [utilisateur, setUtilisateur] = useState(null);
  useEffect(() => {
    const chargerCompte = async () => {
      const response = await api.get("/auth/me");
      setUtilisateur(response.data);
    };
    chargerCompte();
  }, []);
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
      <p>
        Bienvenue sur votre compte {prenom} {nom}.
      </p>
    </>
  );
}

export default Compte;
