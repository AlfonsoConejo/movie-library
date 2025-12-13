import { createContext, useState } from "react";

export const ToastContext = createContext();

const contenidoMensaje = {
    logoutSuccess: {
        type: 'success',
        title: 'Sesión cerrada',
        message: 'La sesión se cerró correctamente.'
    },
    logoutError: {
        type: 'error',
        title: 'Error',
        message: 'Hubo un error al cerrar la sesión.'
    },
    emailVerificationSent: {
        type: 'success',
        title: 'Éxito',
        message: 'Correo enviado exitosamente.'
    },
    emailVerificationNotSent: {
        type: 'error',
        title: 'Error',
        message: 'No se pudo enviar el correo.'
    }
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (toastKey) => {
        const config = contenidoMensaje[toastKey];
        if (!config) {
            console.warn(`El toast "${toastKey}" no existe.`);
            return;
        }
        const {type, title, message} = config;

        const id = crypto.randomUUID();
        const newToast = {
            id,
            type,
            title,
            message
        };

        setToasts(prev => [...prev, newToast]);
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
        {children}
        </ToastContext.Provider>
    );
}