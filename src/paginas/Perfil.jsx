import './Perfil.css';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Perfil() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Mi Perfil</h1>
      {user && (
        <>
          <p>Correo: {user.email}</p>
          <div class="toast success" id="toast">
            <span class="toast-icon">✔️</span>
            <div class="toast-content">
              <p class="toast-title">Éxito</p>
              <p class="toast-message">La sesión se cerró correctamente.</p>
            </div>
            <span class="toast-close">✖️</span>
          </div>
        </>
      )}
    </div>
  );
}