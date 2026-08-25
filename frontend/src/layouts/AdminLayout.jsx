import { Outlet } from "react-router-dom";
import SideBar from "../components/layouts/SideBar.jsx";

function AdminLayout() {
  return (
    <div className="flex flex-col md:flex-row">
      <SideBar />
      <div className="flex-1 py-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
