import './ToastNotification.css';
import checkIcon from '../../assets/cheque.png';
import errorIcon from '../../assets/cancelar.png';

const ToastNotification = ({type, title, message}) => {
  
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
    <div className="toast" style={{ backgroundColor: backgroundColor }} id="toast">
      <img className="toast-icon" src={icon}/>
      <div className="toast-content">
        <p className="toast-title">{title}</p>
        <p className="toast-message">{message}</p>
      </div>
      <span className="toast-close">
        <span className="material-symbols-outlined">
          close
        </span>
      </span>
    </div>
  );
}

export default ToastNotification;