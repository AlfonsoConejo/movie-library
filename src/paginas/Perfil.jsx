import './Perfil.css';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ToastNotification from '../components/ToastNotification/ToastsNotifications';

export default function Perfil() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Mi Perfil</h1>
      {user && (
        <>
          <p>Correo: {user.email}</p>
        </>
      )}
    </div>
  );
}