import api from "../api/axios.js";

export async function payerAvecStripe(data) {
  const response = await api.post("/stripe/checkout", data);
  return response.data;
}
