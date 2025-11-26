// components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, cargandoUsuario } = useContext(UserContext);

  // Mientras vemos si hay usuario, mostramos algo
  if (cargandoUsuario) {
    return <p>Cargando...</p>;
  }

  // Si no hay usuario → redirigimos al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario → mostramos la página protegida
  return children;
}