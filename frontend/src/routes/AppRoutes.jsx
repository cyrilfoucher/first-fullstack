import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Boutique from "../pages/Boutique";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import Produits from "../pages/admin/Produits.jsx";
import AjouterProduit from "../pages/admin/AjouterProduit.jsx";
import ModifierProduit from "../pages/admin/ModifierProduit.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boutique" element={<Boutique />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route element={<AdminLayout />}>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produits"
          element={
            <ProtectedRoute>
              <Produits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produits/ajouter"
          element={
            <ProtectedRoute>
              <AjouterProduit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produits/modifier/:id"
          element={
            <ProtectedRoute>
              <ModifierProduit />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
