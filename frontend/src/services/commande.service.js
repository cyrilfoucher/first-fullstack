import api from "../api/axios.js";

export async function commande(data) {
  const response = await api.post("/commandes", data);
  return response.data;
}

export async function getCommandes() {
  const response = await api.get("/commandes/me");
  return response.data;
}
