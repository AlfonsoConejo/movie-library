import './ToastNotification.css';
import checkIcon from '../../assets/cheque.png';
import errorIcon from '../../assets/cancelar.png';
import { useState, useEffect, useContext } from 'react';
import { ToastContext } from "../../context/ToastContext.jsx";

const ToastNotification = ({id, type, title, message}) => {

  const { removeToast } = useContext(ToastContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada
    setVisible(true);

    // Animación de salida después de 5s
    const timeout = setTimeout(() => {
      setVisible(false); // inicia animación de salida

      // Remueve del estado después de la animación (0.3s)
      setTimeout(() => removeToast(id), 300);
    }, 5000);

    return () => clearTimeout(timeout); // limpia timeout si se desmonta
  }, []);

  const handleClose = (id) => {
    setVisible(false);
    setTimeout(() => removeToast(id), 300);
  }
  
  const ToastStyles = {
    success: {
      backgroundColor: '#b5f8c3',
      icon: checkIcon
    },
    error: {
      backgroundColor: '#ffb7b8',
      icon: errorIcon
    }
  };

  const toastConfig = ToastStyles[type] || ToastStyles.success;
  const { backgroundColor, icon } = toastConfig;

  return(
    <div className={`toast ${visible ? 'show' : ''}`} style={{ backgroundColor: backgroundColor }} id="toast">
      <img className="toast-icon" src={icon}/>
      <div className="toast-content">
        <p className="toast-title">{title}</p>
        <p className="toast-message">{message}</p>
      </div>
      <span className="toast-close" onClick={() => handleClose(id)}>
        <span className="material-symbols-outlined">
          close
        </span>
      </span>
    </div>
  );
}

export default ToastNotification;