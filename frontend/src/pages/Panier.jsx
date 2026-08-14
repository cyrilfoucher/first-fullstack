import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import PageHeader from "../components/common/header/PageHeader";

function Panier() {
  const { panier, removeProduit, deleteProduit, ajouterAuPanier, clearPanier } =
    useContext(CartContext);
  const prixTotal = panier.reduce((total, item) => total + item.produit.prix * item.quantite, 0);

  return (
    <>
      <PageHeader title="Mon panier" />
      {panier.map((item) => (
        <div key={item.produit._id}>
          <img src={item.produit.image} alt={item.produit.description} />
          <p>{item.produit.titre}</p>
          <p>{item.produit.prix} €</p>
          <p>Quantité : {item.quantite}</p>
          <p>Sous-total: {item.quantite * item.produit.prix} €</p>
          <button onClick={() => ajouterAuPanier(item.produit)}>+</button>
          <button onClick={() => removeProduit(item.produit)}>-</button>
          <button onClick={() => deleteProduit(item.produit)}>Supprimer</button>
        </div>
      ))}
      <h2>Votre total est de : {prixTotal} €</h2>
      <button onClick={clearPanier}>Vider le panier</button>
    </>
  );
}
export default Panier;
