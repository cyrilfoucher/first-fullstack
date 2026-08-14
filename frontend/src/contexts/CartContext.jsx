import { createContext, useState } from "react";

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

      return;
    }

    setPanier([
      ...panier,
      {
        produit,
        quantite: 1,
      },
    ]);
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

      return;
    }
  }
  function deleteProduit(produit) {
    setPanier(panier.filter((item) => item.produit._id !== produit._id));
  }
  function clearPanier() {
    setPanier([]);
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
