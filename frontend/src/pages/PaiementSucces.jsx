import PageHeader from "../components/common/header/PageHeader";
import { Link } from "react-router-dom";

function PaiementSucces() {
  return (
    <>
      <PageHeader title="Commande validée" />
      <div className="flex flex-col text-center py-24">
        <p className=" text-2xl font-serif text-amber-800">Votre paiement a été confirmé.</p>
        <p className=" m-2 text-2xl font-serif text-amber-800">
          {" "}
          Votre commande a bien été prise en compte.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-12 mb-16 px-6">
        <Link
          to="/mes-commandes"
          className="border rounded-lg bg-amber-800 text-white text-center p-4 mt-2 hover:bg-amber-700"
        >
          Voir mes commandes
        </Link>
        <Link
          to="/boutique"
          className="border rounded-lg bg-amber-800 text-white text-center p-4 mt-2 hover:bg-amber-700"
        >
          Retour à la boutique
        </Link>
      </div>
    </>
  );
}
export default PaiementSucces;
