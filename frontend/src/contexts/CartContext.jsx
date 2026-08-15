import { createContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [panier, setPanier] = useState([]);
  function ajouterAuPanier(produit) {
    const itemExistant = panier.find((item) => item.produit._id === produit._id);

    if (itemExistant) {
      setPanier(
        panier.map((item) => {
          if (item.produit._id === produit._id) {
            return {
              ...item,
              quantite: item.quantite + 1,
            };
          }
          return item;
        })
      );
      toast.info(`Vous avez augmenter la quantité de ${produit.titre}`);
      return;
    }

    setPanier([
      ...panier,
      {
        produit,
        quantite: 1,
      },
    ]);
    toast.success(`${produit.titre} ajouté au panier`);
  }
  function removeProduit(produit) {
    const itemExistant = panier.find((item) => item.produit._id === produit._id);
    if (itemExistant.quantite === 1) {
      setPanier(panier.filter((item) => item.produit._id !== produit._id));
      return;
    } else {
      setPanier(
        panier.map((item) => {
          if (item.produit._id === produit._id) {
            return {
              ...item,
              quantite: item.quantite - 1,
            };
          }

          return item;
        })
      );
      toast.warning(`Vous avez diminuer la quantité de ${produit.titre}`);

      return;
    }
  }
  function deleteProduit(produit) {
    setPanier(panier.filter((item) => item.produit._id !== produit._id));
    toast.error(`Vous avez supprimé ${produit.titre} de votre panier`);
  }
  function clearPanier() {
    setPanier([]);
    toast.info("Vous avez vidé votre panier");
  }

  return (
    <CartContext.Provider
      value={{ panier, setPanier, ajouterAuPanier, removeProduit, deleteProduit, clearPanier }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
