import { NavLink } from "react-router-dom";
import { HiOutlineHome, HiOutlineBuildingStorefront } from "react-icons/hi2";
function Navigation() {
  return (
    <div className="flex ml-4 sm:ml-6 items-center gap-3 sm:gap-4">
      <NavLink to="/">
        <HiOutlineHome className="text-2xl sm:text-3xl text-white hover:text-amber-700 transition" />
      </NavLink>
      <NavLink to="/boutique">
        <HiOutlineBuildingStorefront className="text-2xl sm:text-3xl text-white hover:text-amber-700 transition" />
      </NavLink>
    </div>
  );
}
export default Navigation;
