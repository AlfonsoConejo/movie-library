import './VerificationAlert.css';
import infoIcon from '../../assets/info.png';

async function enviarEmailConfirmacion() {
    try {
        const res = await fetch('/api/auth/resendVerificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        
    } catch (err) {
        console.error(err);
    }
}

const VerificationAlert = () => {
    return(
        <div className="verification-alert-container">
            <img src={infoIcon}></img>
            <p>Verifica tu cuenta para acceder a todas las funciones.
                <span onClick={() => {enviarEmailConfirmacion()}}
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