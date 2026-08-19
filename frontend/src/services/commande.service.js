import api from "../api/axios.js";

export async function commande(data) {
  const response = await api.post("/commandes", data);
  return response.data;
}

export async function getCommandes() {
  const response = await api.get("/commandes/me");
  return response.data;
}

export async function getAdminCommandes() {
  const response = await api.get("/commandes");
  return response.data;
}

export async function updateStatutCommande(id, statut) {
  const response = await api.patch(`/commandes/${id}`, { statut });
  return response.data;
}
