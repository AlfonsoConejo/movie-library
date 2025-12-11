// context/UserContext.jsx
import { createContext, useState } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (type, message) => {
        const id = crypto.randomUUID();
        const newToast = {
            id,
            type,
            message
        };

        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            removeToast(id);
        }, 5000);
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