import Navbar from "../components/common/navbar/Navbar.jsx";
import Footer from "../components/common/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
function MainLayout() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
