import { NavLink, useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
  return (
    <aside className="w-72 min-h-screen bg-amber-800 p-6 text-white rounded-lg ">
      <h2 className="flex justify-center font-bold bg-amber-100  text-black rounded p-1 my-2 m-6">
        Administration
      </h2>
      <nav className="space mt-8 ">
        <ul className="ml-3 space-y-4">
          <li>
            <NavLink
              to="/admin/produits"
              className="inline-block hover:text-black transition hover:bg-amber-100 rounded-lg p-2"
            >
              Produits
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/produits/ajouter"
              className="inline-block hover:text-black transition hover:bg-amber-100 rounded-lg p-2"
            >
              Ajouter un produit
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              to="/admin/commandes"
              className="inline-block hover:text-black transition hover:bg-amber-100 rounded-lg p-2"
            >
              Commandes
            </NavLink>
          </li>
        </ul>
        <hr className="my-6" />
        <ul className="ml-3 space-y-4">
          <li>
            <NavLink
              to="/"
              className="inline-block hover:text-black transition hover:bg-amber-100 rounded-lg p-2"
            >
              Retour au site
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              onClick={logout}
              className="inline-block hover:text-black transition hover:bg-amber-100 rounded-lg p-2"
            >
              Déconnexion
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
export default SideBar;
