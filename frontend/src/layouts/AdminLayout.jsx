import { Outlet } from "react-router-dom";
import SideBar from "../components/layouts/SideBar.jsx";

function AdminLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
