import { NavLink } from "react-router-dom";
import SearchBar from "../../ui/SearchBar.jsx";
import { useNavigate } from "react-router-dom";

function NavbarActions() {
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
    </>
  );
}
export default NavbarActions;
