import { NavLink } from "react-router-dom";
import SearchBar from "../../ui/SearchBar.jsx";
function NavbarActions() {
  return (
    <>
      <NavLink to="/login">Se connecter</NavLink>
      <NavLink to="/register">S'enregistrer</NavLink>

      <SearchBar />
    </>
  );
}
export default NavbarActions;
