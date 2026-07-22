import { NavLink } from "react-router-dom";
function Navigation() {
  return (
    <div className="flex items-center gap-8">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/boutique">Boutique</NavLink>
    </div>
  );
}
export default Navigation;
