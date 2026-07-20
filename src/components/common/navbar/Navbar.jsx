import logosite from "../../../assets/images/logosite.png";
import NavActions from "./NavActions.jsx";
import Navigation from "./Navigation.jsx";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="h-20 border-b shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link to="/">
          <img src={logosite} alt="logo d'un avion autour de la Terre" className="h-13 shrink-0" />
        </Link>
        <Navigation />
        <NavActions />
      </div>
    </nav>
  );
}

export default Navbar;
