import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  const role = localStorage.getItem("role");
  if (role !== "admin" && adminOnly) {
    return <Navigate to="/compte" />;
  }
  return children;
}
export default ProtectedRoute;
