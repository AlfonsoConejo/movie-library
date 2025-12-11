// context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { ToastContext } from "./ToastContext.jsx";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { addToast } = useContext(ToastContext);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  // Al montar la app intentamos refrescar sesión
  useEffect(() => {
    const initSession = async () => {
      try {
        // 1) Pido nuevo accessToken usando la cookie refreshToken
        const resRefresh = await fetch("/api/auth/refresh-token", {
          method: "POST",
          credentials: "include", // manda cookie HTTPOnly
        });

        if (!resRefresh.ok) {
          // No hay refresh, está expirado, etc.
          setUser(null);
          setAccessToken(null);
          return;
        }

        const dataRefresh = await resRefresh.json();

        if (!dataRefresh.accessToken) {
          setUser(null);
          setAccessToken(null);
          return;
        }

        const newToken = dataRefresh.accessToken;
        setAccessToken(newToken);

        // 2) Con ese accessToken, pido /api/me para obtener al usuario
        const resMe = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });

        if (!resMe.ok) {
          setUser(null);
          return;
        }

        const dataMe = await resMe.json();
        if (dataMe.user) {
          setUser(dataMe.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error inicializando sesión:", err);
        setUser(null);
        setAccessToken(null);
      } finally {
        setCargandoUsuario(false);
      }
    };

    initSession();
  }, []);

  // Cuando haces login, además de setUser, guarda el accessToken
  const login = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        addToast('logoutSuccess');
      } else {
        addToast('logoutError');
      }
    } catch (e) {
      addToast('logoutError');
      console.error(e);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        cargandoUsuario,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}