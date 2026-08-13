import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [panier, setPanier] = useState([]);
  return <CartContext.Provider value={{ panier, setPanier }}>{children}</CartContext.Provider>;
}

export default CartContext;
