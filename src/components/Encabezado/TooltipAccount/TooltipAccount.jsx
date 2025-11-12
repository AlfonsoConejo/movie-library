import './TooltipAccount.css'
import { useNavigate, Link } from 'react-router-dom';

const TooltipAccount = ({tooltipVisible, setTooltipVisible}) => {
    const navigate = useNavigate();
    return(
        <div className={`tooltipContainer ${tooltipVisible ? 'visible' : ''}`}>
            <button className="login-button" onClick={() => navigate('/perfil')}>Iniciar sesión</button>
            <p>o&nbsp;<Link to="/perfil" className="new-account-button"> crear cuenta</Link> </p>
        </div>
    );
};

export default TooltipAccount;