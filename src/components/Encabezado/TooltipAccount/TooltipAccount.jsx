import './TooltipAccount.css'
import { useNavigate, Link } from 'react-router-dom';

const TooltipAccount = ({visible}) => {
    const navigate = useNavigate();
    return(
        <div className={`tooltipContainer ${visible ? 'visible' : ''}`}>
        <button className="login-button" onClick={() => {navigate('/login');}}>Iniciar sesión</button>
            <p>o&nbsp;<Link to="/registro" className="new-account-button">crear cuenta</Link> </p>
        </div>
    );
};

export default TooltipAccount;