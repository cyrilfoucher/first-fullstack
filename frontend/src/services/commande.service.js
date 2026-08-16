import api from "../api/axios.js";

async function commande(data) {
  const response = await api.post("/commandes", data);
  return response.data;
}

export default commande;
