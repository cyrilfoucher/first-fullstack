import { NavLink } from "react-router-dom";
import SearchBar from "../../ui/SearchBar.jsx";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useContext } from "react";
import CartContext from "../../../contexts/CartContext.jsx";

function NavbarActions() {
  const { panier } = useContext(CartContext);
  const nombreArticles = panier.reduce((total, item) => total + item.quantite, 0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
  return (
    <>
      {token ? (
        <>
          <NavLink to="/compte">Compte</NavLink>{" "}
        </>
      ) : (
        <>
          <NavLink to="/login">Se connecter</NavLink>
        </>
      )}
      {token ? (
        <>
          <button type="button" onClick={logout}>
            Déconnexion
          </button>
        </>
      ) : (
        <>
          {" "}
          <NavLink to="/register">S'enregistrer</NavLink>
        </>
      )}

      <SearchBar />
      <NavLink to="/panier" className="relative">
        <HiOutlineShoppingCart className="text-3xl" />

        {nombreArticles > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {nombreArticles}
          </span>
        )}
      </NavLink>
    </>
  );
}
export default NavbarActions;
