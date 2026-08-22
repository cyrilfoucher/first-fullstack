import { useForm } from "react-hook-form";
import login from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHeader from "../components/common/header/PageHeader.jsx";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const response = await login(data);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      if (response.role === "admin") {
        navigate("/admin/produits");
      } else {
        navigate("/compte");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <PageHeader title="Connexion" />
      <div className="mx-auto w-full max-w-md px-6 py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center  gap-4 p-4 rounded-2xl bg-amber-800 shadow"
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border rounded bg-amber-50 px-3 py-2 "
          />
          <input
            type="password"
            placeholder="Mot de passe"
            {...register("motDePasse")}
            className="border rounded bg-amber-50 px-3 py-2 "
          />
          {error && <p className="border bg-red-600 rounded text-white text-center">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className="border rounded-lg bg-amber-50 p-4 mt-2 "
          >
            {loading ? "Connexion.." : "Se connecter"}
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
