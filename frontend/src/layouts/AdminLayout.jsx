import { Outlet } from "react-router-dom";
import SideBar from "../components/layouts/SideBar.jsx";
import PageHeader from "../components/common/header/PageHeader.jsx";

function AdminLayout() {
  return (
    <div>
      <PageHeader />
      <SideBar />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
