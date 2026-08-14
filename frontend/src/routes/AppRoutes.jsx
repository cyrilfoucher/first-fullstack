import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Boutique from "../pages/Boutique";
import Compte from "../pages/Compte.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import Produits from "../pages/admin/Produits.jsx";
import AjouterProduit from "../pages/admin/AjouterProduit.jsx";
import ModifierProduit from "../pages/admin/ModifierProduit.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Panier from "../pages/Panier.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/panier" element={<Panier />} />
        <Route
          path="/compte"
          element={
            <ProtectedRoute>
              <Compte />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route element={<AdminLayout />}>
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produits"
          element={
            <ProtectedRoute adminOnly>
              <Produits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produits/ajouter"
          element={
            <ProtectedRoute adminOnly>
              <AjouterProduit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produits/modifier/:id"
          element={
            <ProtectedRoute adminOnly>
              <ModifierProduit />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
