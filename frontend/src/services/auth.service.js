import api from "../api/axios.js";

async function login(data) {
  const response = await api.post("auth/login", data);
  return response.data;
}

export default login;
