import './VerificationAlert.css';
import infoIcon from '../../assets/info.png';

const VerificationAlert = () => {
    return(
        <div className="verification-alert-container">
            <img src={infoIcon}></img>
            <p>Verifica tu cuenta para acceder a todas las funciones.
                <span 
                    style={{
                        background: "none",
                        border: "none",
                        color: "#856404",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontWeight: 600,
                        marginLeft: "4px"
                    }}
                    >
                    Reenviar correo.
                </span>
            </p>
        </div>
    );
}

export default VerificationAlert;