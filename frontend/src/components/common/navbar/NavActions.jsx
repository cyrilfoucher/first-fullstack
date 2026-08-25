import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useContext } from "react";
import CartContext from "../../../contexts/CartContext.jsx";
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineUserPlus,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserCircle,
} from "react-icons/hi2";

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
      <div className="flex items-center gap-3 sm:gap-4">
        {token ? (
          <NavLink to="/compte">
            <HiOutlineUserCircle className="text-2xl sm:text-3xl text-white hover:text-amber-700 transition" />
          </NavLink>
        ) : (
          <NavLink to="/login">
            <HiOutlineArrowLeftOnRectangle className="text-2xl sm:text-3xl text-white hover:text-amber-700 transition" />
          </NavLink>
        )}
        {token ? (
          <button type="button" onClick={logout}>
            <HiOutlineArrowRightOnRectangle className="text-2xl sm:text-3xl text-white hover:text-amber-700 transition" />
          </button>
        ) : (
          <NavLink to="/register">
            <HiOutlineUserPlus className="text-2xl sm:text-3xl text-white hover:text-amber-700 transition" />
          </NavLink>
        )}

        <NavLink to="/panier" className="relative">
          <HiOutlineShoppingCart className="text-2xl sm:text-3xl rounded bg-amber-50 p-1 text-amber-800" />

          {nombreArticles > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-red-600 text-[10px] sm:text-xs text-white">
              {nombreArticles}
            </span>
          )}
        </NavLink>
      </div>
    </>
  );
}
export default NavbarActions;
