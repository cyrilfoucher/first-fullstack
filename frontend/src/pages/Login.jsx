import { useForm } from "react-hook-form";
import login from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  async function onSubmit(data) {
    setError("");
    try {
      const response = await login(data);
      localStorage.setItem("token", response.token);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Une erreur est survenue.");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("email")} />
      <input type="password" placeholder="Mot de passe" {...register("motDePasse")} />
      {error && <p>{error}</p>}
      <button type="submit">Se connecter</button>
    </form>
  );
}
export default Login;
