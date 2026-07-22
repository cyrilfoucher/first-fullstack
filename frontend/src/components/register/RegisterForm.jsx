import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerSchema.js";
import api from "../../api/axios.js";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/register", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="prenom">Prénom</label>
      <input type="text" id="prenom" placeholder="Prénom" {...register("prenom")} />
      {errors.prenom && <p>{errors.prenom.message}</p>}

      <label htmlFor="nom">Nom</label>
      <input type="text" id="nom" placeholder="Nom" {...register("nom")} />
      {errors.nom && <p>{errors.nom.message}</p>}

      <label htmlFor="email">Email</label>
      <input type="email" id="email" placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="motDePasse">Mot de passe</label>
      <input
        type="password"
        id="motDePasse"
        placeholder="Mot de passe"
        {...register("motDePasse")}
      />
      {errors.motDePasse && <p>{errors.motDePasse.message}</p>}

      <label htmlFor="confirmationMotDePasse">Confirmer le mot de passe</label>
      <input
        type="password"
        id="confirmationMotDePasse"
        placeholder="Confirmer le mot de passe"
        {...register("confirmationMotDePasse")}
      />
      {errors.confirmationMotDePasse && <p>{errors.confirmationMotDePasse.message}</p>}

      <label>
        <input type="checkbox" {...register("confirmation")} />
        Confirmer les données saisies
      </label>
      {errors.confirmation && <p>{errors.confirmation.message}</p>}

      <button type="submit">Envoyer</button>
    </form>
  );
}

export default RegisterForm;
