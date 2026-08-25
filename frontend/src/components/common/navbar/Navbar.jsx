import logosite from "../../../assets/images/logosite.png";
import NavActions from "./NavActions.jsx";
import Navigation from "./Navigation.jsx";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="h12 sm:h-16 border-b shadow-sm bg-amber-800">
      <div className="flex items-center justify-between px-2">
        <Link to="/">
          <img
            src={logosite}
            alt="logo d'un avion autour de la Terre"
            className="h-12 sm:h-16 shrink-0 rounded-tr-2xl rounded-br-2xl"
          />
        </Link>
        <div>
          <Navigation />
        </div>
        <div className="ml-auto pr-4">
          <NavActions />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
